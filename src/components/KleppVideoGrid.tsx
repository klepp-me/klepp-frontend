import { Autocomplete, Grid, TextField, Button } from "@mui/material"
import debounce from "lodash/debounce"
import React, { SyntheticEvent, useEffect, useState } from "react"
import useAuth from "../contexts/AuthContextProvider"
import { KleppVideoFile } from "../models/KleppVideoModels"
import kleppvideoservice from "../services/kleppvideoservice"
import KleppVideoCard from "./KleppVideoCard"
import { useSnackbar } from "notistack"

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
  NAME,
}

function KleppVideoGrid() {
  const [totalCount, setTotalCount] = useState(0)
  const [items, setItems] = useState<KleppVideoFile[]>([])
  const [users, setUsers] = useState<AutocompleteOption[]>([])
  const [tags, setTags] = useState<AutocompleteOption[]>([])
  const [expandedVideoPath, setExpandedVideoPath] = useState<string | null>(
    null
  )

  const { userName } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const [userNameQuery, setUserNameQuery] = useState<QueryType>({
    query: "",
    type: VIDEO_QUERY_TYPE.USERNAME,
  })
  const [tagsQuery, setTagsQuery] = useState<QueryType>({
    query: "",
    type: VIDEO_QUERY_TYPE.TAG,
  })
  const [textQuery, setTextQuery] = useState<QueryType>({
    query: "",
    type: VIDEO_QUERY_TYPE.NAME,
  })

  const paginationLimit = 12

  const handleUsernameSearch = (
    _event: SyntheticEvent<Element, Event>,
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
    _event: SyntheticEvent<Element, Event>,
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

  const handleTextSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == null) {
      return
    }
    const titleQuery = event.target.value
    setTextQuery({ query: titleQuery, type: VIDEO_QUERY_TYPE.NAME })
  }

  const debouncedUsernameSearch = debounce(handleUsernameSearch, 300)
  const debouncedTagSearch = debounce(handleTagsSearch, 300)
  const debouncedTextSearch = debounce(handleTextSearch, 500)

  useEffect(() => {
    fetchItems()
    fetchUsers()
    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameQuery, tagsQuery, textQuery])

  function fetchItems(fromLoad = false) {
    let queryParams = [userNameQuery, tagsQuery, textQuery]
    queryParams = queryParams.filter(query => query.query !== "")

    const offset = fromLoad ? items.length : 0

    if (!fromLoad) {
      // Quick fix to reset pagination state when we are refreshing data without load.
      setItems([])
    } else {
      if (offset < paginationLimit || (offset > 0 && offset == totalCount)) {
        enqueueSnackbar("No more klepps to display, you are all caught up!", {
          variant: "info",
          preventDuplicate: true,
        })
        return
      }
    }

    if (queryParams.length == 0) {
      kleppvideoservice
        .getFiles(`?offset=${offset}&limit=${paginationLimit}`)
        .then(res => {
          setTotalCount(res.data.total_count)
          setItems(prevState => [...prevState, ...res.data.response])
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

      if (textQuery.query != "") {
        queryString = queryString.concat(`name=${textQuery}&`)
      }

      queryString = queryString.concat(
        `offset=${offset}&limit=${paginationLimit}`
      )

      kleppvideoservice
        .getFiles(queryString)
        .then(res => {
          setTotalCount(res.data.total_count)
          setItems(prevState => [
            ...prevState,
            ...res.data.response.filter(item => !items.includes(item)),
          ])
        })
        .catch(e => {
          console.error(e)
        })
    }
  }

  function fetchUsers() {
    kleppvideoservice
      .getUsers()
      .then(res => {
        setUsers(res.data.response.map(user => toAutoCompleteOption(user.name)))
      })
      .catch(e => {
        console.error(e)
      })
  }

  function fetchTags() {
    kleppvideoservice
      .getTags()
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

  function handleVideoExpand(path: string) {
    setExpandedVideoPath(prev => (prev === path ? null : path))
  }

  function renderItems() {
    return items
      .filter(item => item.uri.endsWith(".mp4")) // Maybe redundant. Done in aws
      .map(item => {
        const isExpanded = expandedVideoPath === item.path
        return (
          <Grid
            size={isExpanded ? { xs: 16 } : { xs: 2, sm: 4 }}
            key={item.path}
            sx={{
              minWidth: isExpanded ? "100%" : 200,
              transition: "all 0.3s ease",
            }}>
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
              isExpanded={isExpanded}
              onExpand={() => handleVideoExpand(item.path)}
            />
          </Grid>
        )
      })
  }

  function onLoadMoreVideosClicked() {
    fetchItems(true)
  }

  return (
    <div style={{ marginTop: 24, paddingBottom: 48 }}>
      {/* Search Section */}
      <div
        style={{
          background: "rgba(30, 41, 59, 0.5)",
          borderRadius: 16,
          padding: "24px 32px",
          margin: "0 24px 32px 24px",
          border: "1px solid rgba(148, 163, 184, 0.1)",
        }}>
        <Grid
          className='filterGrid'
          spacing={2}
          columns={12}
          direction='row'
          container
          alignItems='center'>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              id='textfield-videotitle-search'
              onChange={debouncedTextSearch}
              color='primary'
              label='Søk etter video'
              fullWidth
              placeholder='Skriv inn videonavn...'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              disablePortal
              id='autocomplete-box-username'
              options={users.map(user => user.label)}
              onChange={debouncedUsernameSearch}
              fullWidth
              renderInput={params => (
                <TextField
                  {...params}
                  color='primary'
                  label='Søk etter brukernavn'
                  placeholder='Velg bruker...'
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              multiple
              disablePortal
              id='autocomplete-box-tags'
              options={tags.map(tag => tag.label)}
              onChange={debouncedTagSearch}
              fullWidth
              renderInput={params => (
                <TextField
                  {...params}
                  color='primary'
                  label='Søk etter tags'
                  placeholder='Velg tags...'
                />
              )}
            />
          </Grid>
        </Grid>
      </div>

      {/* Video Grid */}
      <div className='videoGrid' style={{ margin: "0 24px" }}>
        {items && (
          <Grid
            direction='row'
            container
            spacing={3}
            columns={16}
            key={"kleppVideoGrid"}>
            {renderItems()}
          </Grid>
        )}
      </div>

      {/* Load More Button */}
      <Button
        variant='contained'
        onClick={onLoadMoreVideosClicked}
        sx={{
          marginTop: 5,
          marginBottom: 2,
        }}>
        Last inn flere videoer
      </Button>
    </div>
  )
}

export default KleppVideoGrid
