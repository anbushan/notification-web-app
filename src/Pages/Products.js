import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import BasicTable from '../Components/BasicTable'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Header from '../Components/Header'
import DeleteModel from '../Components/DeleteModal'
import axios from 'axios'
import moment  from 'moment'

const Products = () => {
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteId, setDeleteId] = useState()

  const navigate = useNavigate()
  const handleNavigateAddForm = () => navigate('/notify-add')

  const deleteHandleClose = () => {
    setDeleteShow(false)
  }

  const deleteHandleShow = async (id) => {
    setDeleteShow(true)
    setDeleteId(id)
  }

  const handleDeleteConfirmation = async (id) => {
    try {
      const response = await axios.delete(
        `https://notification-mysql-48f715723b35.herokuapp.com/v1/api/delete-push-notification/${id}`,
      )

      if (response) {
        window.location.reload()
        // Optionally, you can update your component state or perform any other actions after deletion.
      } else {
        console.error('Error deleting notification:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    } finally {
      // Close your delete modal or update your state as needed
      setDeleteShow(false)
    }
  }

  const COLUMNS = [
    {
      Header: ' ID',
      accessor: 'NotificationId',
    },
   
    {
      Header: 'Image',
      disableSortBy: true,
      Cell: (props) => {
        const imageAccessKey = props.row.original.image // Assuming 'image' is the key for the access key
        return (
          <img
            src={imageAccessKey}
            alt="Product Img"
            style={{ width: '50px', height: '50px' }}
          />
        )
      },
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (props ) => {
        const date = props.row.original.date 
        console.log(date, 'date')
        if(date) {
        // Format the date using moment.js
        const formattedDate = moment(date, 'DD/MM/YYYY, h:mm:ss a').format('DD-MM-YYYY');
        // Render the formatted date
        return <span>{formattedDate}</span>;
        }
       
      },
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Message',
      accessor: 'message',
    },
    {
      Header: 'Link',
      accessor: 'link',
      disableSortBy: true,

      Cell: (props) => {
        const imageAccessKey = props.row.original.link // Assuming 'image' is the key for the access key
        return (
          <a href={imageAccessKey} target="_blank" rel="noreferrer">
            {' '}
            {imageAccessKey}
          </a>
        )
      },
    },
    {
      Header: 'Action',
      accessor: 'action',
      disableSortBy: true,
      Cell: (props) => {
        const rowIdx = props.row.original.refer_notification_id
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="danger"
              // className="m-1"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <>
        <Container fluid className="m-0 p-0">
          {/* Updated styles for margin and padding */}
          <Row className="mt-5 rounded">
            <Header
              ONCLICK={handleNavigateAddForm}
              HEADING="Notifications"
              BUTTON_NAME="Add Notification"
            />
          </Row>
          <Row
            className="my-5 rounded mt-3"
            style={{
              backgroundColor: 'white',
              width: '100%', // Default width for large screens
              margin: 'auto',
            }}
          >
            <BasicTable COLUMNS={COLUMNS} />
          </Row>
        </Container>
        <DeleteModel
          DELETESTATE={deleteShow}
          ONCLICK={deleteHandleClose}
          DESCRIPTION="Notification"
          DELETETITLE="Notification"
          deleteId={deleteId}
          ONCONFIRM={(id) => handleDeleteConfirmation(id)}
        />
      </>
    </div>
  )
}

export default Products
