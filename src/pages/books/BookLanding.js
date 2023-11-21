import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBorrowAction } from '../../redux/borrowHistory/borrowHistoryAction'

function BookLanding() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { bookList } = useSelector(state => state.book)
    const [selectedBook, setSelectedBook] = useState({})
    const { userInfo } = useSelector(state => state.auth)
    useEffect(() => {
        const ourBook = bookList.find(book => book.id === id);
        setSelectedBook(ourBook)
    }, [id, bookList])

    const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000
    const handleOnBorrow = () => {
        // Create a borrow transaction
        const borrowHistory = {
            userId: userInfo.uid,
            userName: userInfo.fName,
            bookId: id,
            title: selectedBook.title,
            url: selectedBook.url,
            borrowAt: Date.now(),
            availableFrom: Date.now() + fourteenDaysInMs
        }
        // Update Book info with available / not available
        dispatch(addNewBorrowAction(borrowHistory))
    }
    return (
        <DefaultLayout>
            <Container>
                <Row>
                    <Link to="/">
                        <Button variant='secondary' className='mt-2'>
                            &lt; Go Back</Button>
                    </Link>
                </Row>
                <Row>
                    <Col>
                        <img src={selectedBook?.url} alt="" />
                    </Col>
                    <Col>
                        <h3>{selectedBook?.title}</h3>
                        <p>Rating: 5 start</p>
                        <p>Year: {selectedBook?.year}</p>
                        <p>{selectedBook?.summary}</p>
                        {userInfo?.uid ? (selectedBook?.isAvailable ? <Button onClick={handleOnBorrow}>Borrow</Button> : <Button variant='secondary'>Available From: {new Date(selectedBook?.availableFrom).toDateString()}</Button>) :
                            <Link to="/login">
                                <Button>Login to Borrow</Button></Link>}
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    )
}

export default BookLanding