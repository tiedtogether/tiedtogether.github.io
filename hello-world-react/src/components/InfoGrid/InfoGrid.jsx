import { Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import './InfoGrid.css';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';

const InfoGrid = ({ emptyMessage, reloadConnectedStudents, rowsEndpoint, rowsInfoToFetch, columns, setErrorMessage }) => {

  const [checks, setChecks] = useState({});
  const [rows, setRows] = useState([]);

  const [readyToGetRows, setReadyToGetRows] = useState(false); // flip flop

  useEffect(() => { // when rendered, getrows
    setChecks({});
    setRows([]);
    setReadyToGetRows(!readyToGetRows);
  }, [reloadConnectedStudents]);

  useEffectAfterMount(() => {
    async function getRows() {
      try {
        const res = await api.get(rowsEndpoint);
        // const res = await api.get('/api/v1/students/all');
        const profiles = res.data;
  
        // console.log("profiles", profiles)
        // console.log("rows right before getting", rows)
  
        let toAdd = {};
  
        profiles.forEach((profile) => {
  
          // info that will go in the row
          const rowInfo = rowsInfoToFetch(profile);
          
          // check if this row already exists
          if (!checks[profile.kisdID]) {
            // prepare to add all at once
            // must add all at once or they fetch old usestates
            toAdd[profile.kisdID] = rowInfo;
          }
  
        });
  
        // if it doesnt, add it to the row-existing-checker
        setChecks({...checks, ...toAdd});
        // and put it in the grid
        setRows([...rows, ...Object.values(toAdd)]);
  
      } catch (e) {
        setErrorMessage("A server error occured. Please try again later.");
        console.log(e);
      }
    }
    getRows();
  }, [readyToGetRows])

  // useEffect(() => {
  //   console.log("rows ", rows)
  // }, [rows])

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{border: '2px solid #FFDC22'}}
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            {emptyMessage}
          </Stack>
        ),
        NoResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            No entries match this filter.
          </Stack>
        )
      }}
    />
  )
}

export default InfoGrid