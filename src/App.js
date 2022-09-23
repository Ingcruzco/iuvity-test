import {
  useState,
  cloneElement
} from 'react'

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid
} from '@mui/material'


import Form1 from './components/Form1'
import Form2 from './components/Form2'
import TableData from './components/Table'
import { useForm } from './hooks/useForm'
import useUsers from './hooks/useUsers'
import { createContext } from 'react'

const steps = [
  {
    label: 'Paso 1',
    componente: <Form1 />
  },
  {
    label: 'Paso 2',
    componente: <Form2 />
  }
]
export const UsersContext = createContext([]);

const App = () => {
  const [step, setStep] = useState(0)
  const [ loading, setLoading ] = useState(false)
  const { users, setUsers } = useUsers(setLoading)
  const formHandler = useForm()

  return (
    <UsersContext.Provider value={{ users, setUsers, loading, setLoading }}>
      <Container
        fixed
        style={{
          padding: '3em'
        }}
      >
        <Grid
          container
          spacing={6}
        >
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
          >
            <Stepper
              activeStep={step}
            >
              {steps.map((step, key) => (
                <Step
                  key={key}
                >
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              style={{
                marginTop: '4em'
              }}
            >
              {
                cloneElement(
                  steps[step].componente, 
                  {'setStep':setStep, 'formHandler':formHandler}
                )
              }
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            sm={12}
            xs={12}
          >
            <TableData users= {users} />
          </Grid>
        </Grid>
      </Container>
    </UsersContext.Provider >
  )
}

export default App
