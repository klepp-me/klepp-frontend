import { Autocomplete, Grid, TextField, Typography } from "@mui/material"
import { debounce as Debouncer } from "lodash"
import React, { SyntheticEvent, useEffect, useState } from "react"
import useAuth from "../contexts/AuthContextProvider"
import { KleppVideoFile } from "../models/KleppVideoModels"
import kleppvideoservice from "../services/kleppvideoservice"
import KleppVideoCard from "./KleppVideoCard"

interface AutocompleteOption {
  label: string
}

interface QueryType {
  query: string
  type: VIDEO_QUERY_TYPE
}

enum VIDEO_QUERY_TYPE {
  USERNAME,
  TAG,
}

function KleppVideoGrid() {
  const [items, setItems] = useState<KleppVideoFile[]>([])
  const [users, setUsers] = useState<AutocompleteOption[]>([])
  const [tags, setTags] = useState<AutocompleteOption[]>([])

  const { accessToken, userName } = useAuth()

  const [userNameQuery, setUserNameQuery] = useState<QueryType>({
    query: "",
    type: VIDEO_QUERY_TYPE.USERNAME,
  })
  const [tagsQuery, setTagsQuery] = useState<QueryType>({
    query: "",
    type: VIDEO_QUERY_TYPE.TAG,
  })
  const [textQuery, setTextQuery] = useState("")

  const handleUsernameSearch = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    const queryString = value != null ? value : ""
    const query: QueryType = {
      query: queryString,
      type: VIDEO_QUERY_TYPE.USERNAME,
    }
    setUserNameQuery(query)
  }

  const handleTagsSearch = (
    event: SyntheticEvent<Element, Event>,
    value: string[] | null
  ) => {
    let queryString = ""
    if (value) {
      value.forEach(query => {
        queryString = queryString.concat(`&tag=${query}`)
      })
    }
    const query: QueryType = {
      query: queryString,
      type: VIDEO_QUERY_TYPE.TAG,
    }
    setTagsQuery(query)
  }

  const handleTextSearch = (event: React.ChangeEvent<any>) => {
    if (event.target.value == null) {
      return
    }
    const titleQuery = event.target.value != null ? event.target.value : ""
    setTextQuery(titleQuery)
  }

  const debouncedUsernameSearch = Debouncer(handleUsernameSearch, 300)
  const debouncedTagSearch = Debouncer(handleTagsSearch, 300)
  const debouncedTextSearch = Debouncer(handleTextSearch, 500)

  useEffect(() => {
    fetchItems()
    fetchUsers()
    fetchTags()
  }, [userNameQuery, tagsQuery, textQuery, accessToken])

  function fetchItems() {
    let queryParams = [userNameQuery, tagsQuery]
    queryParams = queryParams.filter(query => query.query !== "")

    if (queryParams.length == 0) {
      kleppvideoservice
        .getFiles(``, accessToken)
        .then(res => {
          setItems(
            res.data.response.filter(item =>
              item.display_name.toLowerCase().includes(textQuery.toLowerCase())
            )
          )
        })
        .catch(e => {
          console.error(e)
        })
    } else {
      let queryString = "?"
      queryParams.forEach(query => {
        switch (+query.type) {
          case VIDEO_QUERY_TYPE.USERNAME:
            queryString = queryString.concat(`username=${query.query}&`)
            break
          case VIDEO_QUERY_TYPE.TAG:
            queryString = queryString.concat(query.query)
            break
          default:
            break
        }
      })
      kleppvideoservice
        .getFiles(queryString, accessToken)
        .then(res => {
          setItems(
            res.data.response.filter(item =>
              item.display_name.toLowerCase().includes(textQuery.toLowerCase())
            )
          )
        })
        .catch(e => {
          console.error(e)
        })
    }
  }

  function fetchUsers() {
    kleppvideoservice
      .getUsers(accessToken)
      .then(res => {
        setUsers(res.data.response.map(user => toAutoCompleteOption(user.name)))
      })
      .catch(e => {
        console.error(e)
      })
  }

  function fetchTags() {
    kleppvideoservice
      .getTags(accessToken)
      .then(res => {
        setTags(res.data.response.map(tag => toAutoCompleteOption(tag.name)))
      })
      .catch(e => {
        console.error(e)
      })
  }

  const toAutoCompleteOption = (input: string): AutocompleteOption => {
    return {
      label: input,
    }
  }

  function itemDeleted(fileName: string) {
    setItems(prevState => [...prevState.filter(item => item.path !== fileName)])
  }

  function renderItems() {
    return items
      .filter(item => item.uri.endsWith(".mp4")) // Maybe redundant. Done in aws
      .slice(0, 12)
      .map(item => {
        return (
          <Grid
            item={true}
            xs={2}
            sm={4}
            key={item.path}
            sx={{ minWidth: 200 }}>
            <KleppVideoCard
              file={item}
              username={item.user.name}
              datetime={new Date(item.uploaded_at).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              canDelete={userName != null && item.user.name === userName}
              canHide={userName != null && item.user.name === userName}
              onDelete={() => itemDeleted(item.path)}
            />
          </Grid>
        )
      })
  }

  return (
    <div style={{ marginTop: 24, paddingBottom: 16 }}>
      <Grid
        className='filterGrid'
        spacing={2}
        columns={4}
        direction='row'
        container
        style={{ marginLeft: 32 }}>
        <TextField
          id='textfield-videotitle-search'
          onChange={debouncedTextSearch}
          color='primary'
          label='Søk etter video'
          sx={{ width: 300, marginTop: 2, marginInlineEnd: 2 }}
        />
        <Autocomplete
          disablePortal
          id='autocomplete-box-username'
          options={users.map(user => user.label)}
          onChange={debouncedUsernameSearch}
          sx={{ width: 300, marginInlineEnd: 2, marginTop: 2 }}
          renderInput={params => (
            <TextField
              {...params}
              color='primary'
              label='Søk etter brukernavn'
            />
          )}
        />
        <Autocomplete
          multiple
          disablePortal
          id='autocomplete-box-tags'
          options={tags.map(tag => tag.label)}
          onChange={debouncedTagSearch}
          sx={{ width: 300, marginInlineEnd: 2, marginTop: 2 }}
          renderInput={params => (
            <TextField {...params} color='primary' label='Søk etter tags' />
          )}
        />
      </Grid>
      <Typography
        variant='h4'
        color='white'
        sx={{ mt: 2, textAlign: "left", ml: 2 }}>
        Nyeste videoer
      </Typography>
      <div
        className='videoGrid'
        style={{ marginTop: 12, marginLeft: 16, marginRight: 16 }}>
        {items && (
          <Grid
            direction='row'
            container
            spacing={2}
            columns={16}
            key={"kleppVideoGrid"}>
            {renderItems()}
          </Grid>
        )}
      </div>
    </div>
  )
}

export default KleppVideoGrid
