import { Button, Modal, Paper, Typography } from "@material-ui/core"
import './Login.css'
import React from "react"

interface Props {
  show: boolean
}

const Login = ({ show }: Props) => (
  <Modal
    open={show}
    className="LoginModal"
  >
    <Paper className="LoginPaper" >
      
      <Typography variant="h2">
        Login
      </Typography>
      <div className="LoginContainer">
        <Button variant="contained" color="primary" href="http://localhost:3001/auth/google">
          Login mit Google
        </Button>
      </div>
    </Paper>
  </Modal>
)


export default Login