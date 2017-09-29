import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PageHeader, Table } from 'react-bootstrap'

const styles = {
  addVideoLink:{
    textAlign:'right',
    float:'right',
    fontSize:'18px',
  },
}

export default class VideoList extends React.Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  static propTypes = {
    videos: PropTypes.array.isRequired,
    fetchVideoList: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    videos: []
  }

  componentDidMount() {
    this.props.fetchVideoList()
  }

  delete(e){
    e.preventDefault()
    console.log(`deleting video ${e.target.id}`)

    this.props.deleteVideo(e.target.id).then((response) => {
      if(response.error){
          alert(`Failed to delete your video: ${response.error}`)
          return
      }

      this.props.fetchVideoList()
    })
  }


  render(){
    //TODO - add pagination

    const { videos } = this.props

    return(
      <div>
        <PageHeader>
          Video Management
          <Link to="/admin/video/add" style={styles.addVideoLink} className='btn btn-success'>Add Video</Link>
        </PageHeader>

        <Table responsive striped condensed>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Taxonomy</th>
              <th>Date Created</th>
              <th>Created By</th>
              <th>Bucket</th>
              <th>Object Name</th>
              <th>File Name</th>
            </tr>
          </thead>
          <tbody>
            { videos.map((video, i) => {
              return (
                <tr key={i}>
                  <td><Link to={`/admin/video/edit/${video.id}`}>Edit</Link></td>
                  <td><Link to={`${video.id}`} id={video.id} onClick={this.delete}>Delete</Link></td>
                  <td><Link to={`/admin/video/${video.id}`}>{video.id}</Link></td>
                  <td>{video.title}</td>
                  <td>{video.taxonomy_id}</td>
                  <td>{video.created.toString()}</td>
                  <td>{video.created_by}</td>
                  <td>{video.bucket}</td>
                  <td>{video.object_name}</td>
                  <td>{video.file_name}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
