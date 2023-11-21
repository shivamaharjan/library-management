import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "./bookCard.css"
function BookCard({ id, url, title, author, year }) {
    return (
        <Link to={`/book/${id}`} className='nav-link'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {author} - {year}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default BookCard