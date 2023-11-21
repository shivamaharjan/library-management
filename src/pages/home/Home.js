import React, { useEffect } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Carousels from "../../components/carousels/Carousels";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookAction } from "../../redux/book/bookAction";
import BookCard from "../../components/book/BookCard";

function Home() {
  const disptach = useDispatch();
  // Dispatch action to pull data from firebase
  // and put it in Store
  useEffect(() => {
    disptach(getAllBookAction())
  }, [])

  const bookList = useSelector(state => state.book.bookList)
  return <DefaultLayout>
    {/* Hero Section */}
    <Carousels />
    {/* Books Detail */}
    <Container>
      <Row>
        <Col>
          <h1>Available Books</h1>
          <hr></hr>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap g-2 justify-content-around">
          {/* Book Cards */}
          {bookList.map(book => {
            return <BookCard key={book.id} {...book} />
          })}
        </Col>
      </Row>
    </Container>
  </DefaultLayout>;
}

export default Home;
