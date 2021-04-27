import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isModalOpen: false,
            rating: 0,
            comment: 0,
            author: '',
            touched:{
                rating: false,
                author: false,
                comment: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render () {
        return(
            <div>
            <Button outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg"></i>
                Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
                    <div className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" className="form-control">
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                    </div>
                    <div className="form-group">
                    <Label htmlFor="author">Your Name</Label>
                    <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name"
                                            validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}/>
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                    </div>
                    <div className="form-group">
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea className="form-control" rows="6" model=".comment" id="comment" name="comment" placeholder="Your Comment"/>
                    </div>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

function RenderComments ({comments}) {
        if(comments) {
            return(
                <div className= "col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => <div key={comment.id}><p>{comment.text}</p>{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>)}
                    <CommentForm />
                </div>
            );
        };
    }
function RenderCampsite({campsite}) {
        return(
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }


export default CampsiteInfo;