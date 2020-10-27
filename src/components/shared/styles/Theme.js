import {createMuiTheme} from '@material-ui/core/styles'
import {pink} from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            light: '#5c67a3',
            main: '#3f4771',
            dark: '#2e355b',
            contrastText: '#fff'
        }
    },
    secondary:{
        light: '#ff79b0',
        main: '#ff4081',
        dark: '#c60055',
        contrastText: '#000'
    },
    openTitle:{
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    },
    mixins: {
        toolbar: {
        minHeight: 48
    }
}
})

export default theme