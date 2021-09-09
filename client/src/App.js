import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function App() {

  const classes = useStyles();

  const [id_usuario, setId] = useState("")  
  const [cedula_usuario, setCedula] = useState("")  
  const [nombre_usuario, setNombre] = useState("")
  const [telefono_usuario, setTelefono] = useState("")
  const [mail_usuario, setMail] = useState("")

  const [users, setUsers] = useState([])


  const guardar = () => {
    Axios.post('http://localhost:3050/add', 
    {
        nombre_usuario: nombre_usuario,
        cedula_usuario: cedula_usuario,
        teléfono_usuario: telefono_usuario,
        mail_usuario: mail_usuario
    })
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

useEffect(() => {
  Axios.get('http://localhost:3050/tbl_usuario', 
  {
      nombre_usuario: nombre_usuario,
      cedula_usuario: cedula_usuario,
      teléfono_usuario: telefono_usuario,
      mail_usuario: mail_usuario
  })
  .then(function (response) {
    setUsers(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}, []);


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Container component="main" >
    <CssBaseline />
    <div className={classes.paper}>
      
      <Typography component="h1" variant="h5">
        Registrar
      </Typography>
      <form className={classes.form} noValidate>
        
       <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="cedula"
              label="Cedula"
              type="cedula"
              id="cedula"
              autoComplete="current-cedula"
              onChange={(e) => {
                setCedula(e.target.value);
              }}
            />

      <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="nombre"
              label="Nombre"
              type="nombre"
              id="nombre"
              autoComplete="current-nombre"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="mail"
          label="Mail"
          name="mail"
          autoComplete="mail"
          autoFocus
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="telefono"
          label="Telefono"
          type="telefono"
          id="telefono"
          autoComplete="current-telefono"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick= {guardar}
        >
          Guardar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>

    <Box
        display="flex"
        flexWrap="wrap"
        alignContent="flex-start"
        p={1}
        m={1}
        bgcolor="background.paper"
        //sx={{ maxWidth: 300, height: 200 }}
      >
        <Box p={1} bgcolor="grey.300">
        {
                    users.map((item) => {
                      return (
                                  <Card className={classes.root}>
                                  <CardHeader
                                    avatar={
                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                        {item.nombre_usuario}
                                      </Avatar>
                                    }
                                    action={
                                      <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                      </IconButton>
                                    }
                                    title={item.nombre_usuario}
                                    subheader= {item.cedula_usuario}
                                  />
                                  
                                  <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                      {item.nombre_usuario}
                                    </Typography>
                                  </CardContent>
                                  <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                      <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                      <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                      className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                      })}
                                      onClick={handleExpandClick}
                                      aria-expanded={expanded}
                                      aria-label="show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </CardActions>
                                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                      <Typography paragraph>Method:</Typography>
                                      <Typography paragraph>
                                        {item.cedula_usuario}
                                      </Typography>
                                      <Typography paragraph>
                                        {item.telefono_usuario}
                                      </Typography>
                                      <Typography paragraph>
                                      {item.mail_usuario}
                                      </Typography>
                                      <Typography>
                                        {item.cedula_usuario}
                                      </Typography>
                                    </CardContent>
                                  </Collapse>
                                </Card>
                      );   
                    })
                  }
        </Box>
       
      </Box>

   
    
  
   
  </Container>
  );
}

export default App;
