import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Background from '../../components/Background/Background';
import NavBar from '../../components/NavBar/NavBar';
import ErrorPage from '../ErrorPage/ErrorPage';
import api from '../../api/axiosConfig';
import { Button, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';
import Authenticate from '../../components/Authenticate/Authenticate';
import TriggerOnRender from '../../components/TriggerOnRender/TriggerOnRender';
import YellowButton from '../../components/YellowButton/YellowButton';
import InfoGrid from '../../components/InfoGrid/InfoGrid';

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [tutorName, setTutorName] = useState("");
  async function getTutorName() {
    try {
      const res = await api.get(`/api/v1/tutors/kisdID/${location.state.id}`);
      setTutorName(res.data.firstName + " " + res.data.lastName);
    } catch (e) {
      setTutorName("WARNING: A server error occured. Functionality may be limited.")
      setErrorMessage("A server error occured. Please try again later.");
      console.log(e);
    }
  }

  function onLoaded() {
    getTutorName();
  }

  const [reloadConnectedStudents, setReloadConnectedStudents] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")

  return (
    <>
      <Authenticate location={location}>
        <TriggerOnRender func={onLoaded}>
          {/* once userId has been gotten so that it can be used in the api request */}
          <Background style={{overflow: 'auto'}}>
            <NavBar showSignIn={false} />
            <Stack spacing={1} sx={{margin: '10vmin', minHeight: '140vh'}}>
              <Typography variant="h4" sx={{fontWeight: '900'}}>Dashboard</Typography>
              <Typography variant="subtitle2">Welcome, {tutorName}</Typography>

              <br />
              <Typography variant="subtitle1" sx={{fontWeight: '900'}}>Connected Students</Typography>
              <InfoGrid
                emptyMessage="You have not connected with any students yet."
                reloadConnectedStudents={reloadConnectedStudents}
                rowsEndpoint={`/api/v1/tutors/scheduledStudents/${location.state.id}`}
                rowsInfoToFetch={(profile) => {
                  return {
                    id: profile.kisdID,
                    name: profile.firstName + " " + profile.lastName,
                    instrument: profile.instrument,
                    grade: profile.grade,
                    band: profile.band,
                    email: profile.email,
                    phone: profile.phoneNumber,
                    communicationPreference: profile.communicationPreference,
                    settingPreference: profile.settingPreference
                  };
                }}
                columns={[
                  {
                    field: "disconnect",
                    headerName: "Disconnect?",
                    sortable: false,
                    minWidth: 150,
                    renderCell: (params) => {
                      return <YellowButton onClick={(event) => {
                        event.stopPropagation(); // dont select the row
                        try {
                          // console.log(params.row)
                          api.get(`/api/v1/students/disconnectStudent/${location.state.id}/${params.row.id}`);
                          params.row.name = "Removing...";
                          setReloadConnectedStudents(!reloadConnectedStudents); // trigger reload
                        } catch (e) {
                          setErrorMessage("A server error occured. Please try again later.");
                          console.log(e.message);
                        }
                      }} style={{height: '2rem'}}>Disconnect</YellowButton>;
                    }
                  },
              
                  { field: 'name', headerName: 'Name', minWidth: 250 },
                  { field: 'instrument', headerName: 'Instrument', minWidth: 200 },
                  { field: 'grade', headerName: 'Grade', minWidth: 50 },
                  { field: 'band', headerName: 'Band', minWidth: 150 },
              
                  { field: 'email', headerName: 'Email', minWidth: 300 },
                  { field: 'phone', headerName: 'Phone Number', minWidth: 150 },
              
                  { field: 'communicationPreference', headerName: 'Communication Preference', minWidth: 250 },
                  { field: 'settingPreference', headerName: 'Setting Preference', minWidth: 250 },
                  
                ]}
                setErrorMessage={setErrorMessage}
              />
              <Typography variant="subtitle1" sx={{color: 'red'}}>{errorMessage}</Typography>
              
              <br />
              <Typography variant="subtitle1" sx={{fontWeight: '900'}}>Connect With New Students</Typography>
              <InfoGrid
                emptyMessage="No relevant students for you to tutor at this time, please check back later!"
                reloadConnectedStudents={reloadConnectedStudents}
                rowsEndpoint={`/api/v1/tutors/tutorWaitingList/${location.state.id}`}
                rowsInfoToFetch={(profile) => {
                  return {
                    id: profile.kisdID,
                    name: profile.firstName + " " + profile.lastName,
                    instrument: profile.instrument,
                    grade: profile.grade,
                    band: profile.band,
                    email: profile.email,
                    phone: profile.phoneNumber,
                    communicationPreference: profile.communicationPreference,
                    settingPreference: profile.settingPreference
                  };
                }}
                columns={[
                  {
                    field: "connect",
                    headerName: "Connect?",
                    sortable: false,
                    minWidth: 150,
                    renderCell: (params) => {
                      return <YellowButton onClick={(event) => {
                        event.stopPropagation(); // dont select the row
                        try {
                          api.get(`/api/v1/students/connectStudent/${location.state.id}/${params.row.id}`);
                          // pass auth credentials on
                          navigate('/hello-world-app/connect-confirm', {state: {id: location.state.id, password: location.state.password, student: params.row}});
                        } catch (e) {
                          setErrorMessage("A server error occured. Please try again later.");
                          console.log(e.message);
                        }
                      }} style={{height: '2rem'}}>Connect</YellowButton>;
                    }
                  },
              
                  { field: 'name', headerName: 'Name', minWidth: 250 },
                  { field: 'instrument', headerName: 'Instrument', minWidth: 200 },
                  { field: 'grade', headerName: 'Grade', minWidth: 50 },
                  { field: 'band', headerName: 'Band', minWidth: 150 },
              
                  // { field: 'email', headerName: 'Email', minWidth: 300 },
                  // { field: 'phone', headerName: 'Phone Number', minWidth: 150 },
              
                  { field: 'communicationPreference', headerName: 'Communication Preference', minWidth: 250 },
                  { field: 'settingPreference', headerName: 'Setting Preference', minWidth: 250 },
                  
                ]}
                setErrorMessage={setErrorMessage}
              />

            </Stack>
          </Background>
        </TriggerOnRender>
      </Authenticate>
    </>
  )
}

export default Dashboard