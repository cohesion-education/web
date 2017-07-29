import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormControl, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const styles = {
  addForm:{
    padding:'15px 0px',
  },
}

export default class TaxonomyForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    baseURI: PropTypes.string.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    showAddForm: PropTypes.bool,
    selectedItem: PropTypes.string,
  }

  static defaultProps = {
    list: [],
    baseURI: '',
    title: ''
  }

  handleInputChange(event) {
    //no need to really do anything
  }

  handleSubmit(e){
    e.preventDefault()
    const name = this.addInput.name
    const value = this.addInput.value
    this.props.handleFormSubmit(name,value)
    this.addInput.value = ''
  }

  render(){
    const { title, showAddForm, list, baseURI, selectedItem } = this.props

    return(
      <div>
        <h3>{title}</h3>

        { showAddForm &&
          <Form horizontal style={styles.addForm} onSubmit={this.handleSubmit}>
            <FormControl
              type='text'
              bsSize='large'
              name={title.toLowerCase()}
              placeholder={'New ' + title}
              onChange={this.handleInputChange}
              inputRef={ref => { this.addInput = ref }}
            />
          </Form>
        }

        <Nav bsStyle="pills" stacked>
          { list.map((t, i) => {
            return (
              <li key={i} role="presentation" className={t.name === selectedItem ? 'active' : ''}>
                <Link to={baseURI + t.name}>{t.name}</Link>
              </li>
            )
          }) }
        </Nav>

      </div>
    )
  }
}
