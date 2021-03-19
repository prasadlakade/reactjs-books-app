import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Input from '../input/Input';
import RButton from '../button/RButton';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [], validation: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    //get form values on submit
    const title = event.target.booktitle.value;
    const author = event.target.bookauthor.value;
    const isbn = event.target.bookisbn.value;

    //handle validation
    if (title === '' || author === '' || isbn === '') {
      this.setState(
        {
          validation: 'error',
        },
        () => {
          console.log(this.state);
        }
      );

      return false;
    }

    this.setState(
      {
        books: [
          ...this.state.books,
          { title: title, author: author, isbn: isbn },
        ],
        validation: 'added',
      },
      () => {
        console.log(this.state);
        event.target.booktitle.value = '';
        event.target.bookauthor.value = '';
        event.target.bookisbn.value = '';
        localStorage.setItem('data', JSON.stringify(this.state));
      }
    );
  }

  deleteBook(event) {
    const isbnNo =
      event.target.parentElement.previousElementSibling.textContent;
    const booksData = JSON.parse(localStorage.getItem('data'));
    console.log(isbnNo);
    const booksArray = booksData.books.filter((book) => book.isbn !== isbnNo);
    console.log(booksArray);

    this.setState(
      {
        books: booksArray,
        validation: 'removed',
      },
      () => {
        console.log(this.state);
        localStorage.setItem('data', JSON.stringify(this.state));
      }
    );
  }

  componentDidMount() {
    const booksData = JSON.parse(localStorage.getItem('data'));

    if (booksData) {
      const booksArray = [];
      booksData.books.map((ele) => booksArray.push(ele));

      //console.log(booksArray);

      this.setState(
        {
          books: booksArray,
          validation: '',
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div className='form-wrapper'>
          {this.state.validation === 'error' && (
            <div className='alert alert-danger'>
              Please fill in all the fields!
            </div>
          )}
          {this.state.validation === 'added' && (
            <div className='alert alert-success'>New Book Added...</div>
          )}
          {this.state.validation === 'removed' && (
            <div className='alert alert-info'>Book Removed...</div>
          )}

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Input
                type={'text'}
                title={'Book Title'}
                name={'booktile'}
                placeholder={'Enter Book Title'}
                controlId={'booktitle'}
                handleChange={this.bookTitle}
              />

              <Input
                type={'text'}
                title={'Book Author'}
                name={'bookauthor'}
                placeholder={'Enter Book Author'}
                controlId={'bookauthor'}
                handleChange={this.bookAuthor}
              />

              <Input
                type={'text'}
                title={'Book ISBN#'}
                name={'bookisbn'}
                placeholder={'Enter Book ISBN#'}
                controlId={'bookisbn'}
                handleChange={this.bookISBN}
              />
              {/* <Form.Group as={Col} md={4} controlId='booktitle'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Book Title'
                  name='booktitle'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} controlId='bookauthor'>
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Book Author'
                  name='bookauthor'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} controlId='bookisbn'>
                <Form.Label>Book ISBN#</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Book ISBN#'
                  name='bookisbn'
                />
              </Form.Group> */}
            </Row>
            <Row>
              <Col>
                {/* <Button variant='primary' type='submit'>
                  Add Book
                </Button> */}
                <RButton
                  variant={'primary'}
                  type={'submit'}
                  value={'Add Book'}
                />
              </Col>
            </Row>
          </Form>
        </div>
        <hr />

        <div className='out-wrapper'>
          <h3 className='bg bg-default'>Book Lists:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Book Author</th>
                <th>Book isbn#</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => (
                <tr key={book.isbn} id={book.isbn}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>
                    {/* <Button
                      className='delete'
                      variant='danger'
                      size='sm'
                      onClick={this.deleteBook}>
                      X
                    </Button> */}
                    <RButton
                      className={'delete'}
                      variant={'danger'}
                      size={'sm'}
                      value={'X'}
                      handleClick={this.deleteBook}
                    />
                  </td>
                </tr>
              ))}
              {this.state.books == '' && (
                <tr>
                  <td colSpan={4}>No Data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default FormContainer;
