import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BasicTable from '../Components/BasicTable'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Header from '../Components/Header'
import DeleteModel from '../Components/DeleteModal'
import axios from 'axios'
import moment from 'moment'
import defaultImage from '../Assets/defaultImage.png'
import LanguageDropdown from '../Components/Language'
import { useTranslation } from 'react-i18next';


const Products = () => {
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const { t } = useTranslation();

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
      Header: 'ID',
      accessor: 'NotificationId',
    },

    {
      Header: 'Image',
      disableSortBy: true,
      Cell: (props) => {
        const imageAccessKey = props.row.original.image // Assuming 'image' is the key for the access key
        return (
          props.row.original.image?
          <img
            src={imageAccessKey}
            alt="Product Img"
            style={{ width: '50px', height: '50px' }}
          /> :  <img
          src={defaultImage}
          alt="Product Img"
          style={{ width: '50px', height: '50px' }}
        />
        )
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
        const rowIdx = props.row.original.NotificationId
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="danger"
              // className="m-1"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete size={20}/>
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
            <Col className="d-flex m-2 align-items-end justify-content-end ">
              <LanguageDropdown />
            </Col>
          {/* Updated styles for margin and padding */}
          <Row className="mt-3 rounded">
            <Header
              ONCLICK={handleNavigateAddForm}
              HEADING={t("Notifications")}
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
            <BasicTable COLUMNS= {COLUMNS}/>
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
