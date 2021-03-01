import React  from 'react'
import PDFScreen from '../../Common/PDFScreen'
import Loading from '../../Common/Loading'
import {connect} from 'react-redux'

const  Catalogue=({catalogue})=> {
    if(!catalogue) return <Loading spacing={50}  />
    return <PDFScreen uri={catalogue} />
}

export default connect(
  state=>({
    catalogue:state.auth.catalogue
  }),
  null
)(Catalogue)
