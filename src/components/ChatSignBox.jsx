import React, { Component } from 'react'
import { connect } from 'react-redux'
import Firebase from '../Firebase'
export class ChatBox extends Component {

    state = {
        chatUser: {},
        chats: [],
        message: "",
        isUserSelecte: false
    }
    componentDidMount() {
        window.location.pathname.split('/').length > 2 ? this.setState({ chatUser: Object.values(this.props.user).filter(data => data.uid === window.location.pathname.split('/')[2])[0], isUserSelecte: true }) : console.log('url', this.props.match)
    }
    onChatClick = (data) => {
        this.setState({ chats: [] })
        this.setState({ chatUser: data, isUserSelecte: true })
        let currentUser = localStorage.getItem('uid');
        let merge_uid = this.uid_merge(currentUser, data.uid);
        this.getMessage(merge_uid)
    }
    getMessage = (uid) => {
        Firebase.database().ref(`chats/${uid}`).on('child_added', snapshot => {
            this.state.chats.push(snapshot.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }
    send_message = () => {
        let user = localStorage.getItem('uid');
        let chat_user = this.state.chatUser;
        let merge_uid = this.uid_merge(user, chat_user.uid);
        Firebase.database().ref(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: localStorage.getItem('name'),
            uid: localStorage.getItem('uid'),
        })
        this.setState({
            message: ""
        })
    }
    uid_merge = (a, b) => {
        console.log('user', a + ' curretUser', b)
        if (a < b) {
            return a + b
        } else {
            return b + a
        }

    }

    render() {
        console.log('params',window.location.pathname.split('/')[2])
        return (
            <div className="Chat-Page flex">
                <div className="userPannel">
                    <div className="inbox-heading">
                        <h2>INBOX</h2>
                    </div>
                    <div className="users-div">
                        {Object.values(this.props.user).map((data, i) => data.uid !== localStorage.getItem('uid') ? <div className="user flex" key={data + i}>
                            <img src={data.photo} alt="avatar" />
                            <h2>{data.name} </h2>
                            <i onClick={() => this.onChatClick(data)} style={{ float: "right" }} className="fas fa-chevron-right"></i>
                        </div> : null)}
                    </div>
                </div>
                {this.state.isUserSelecte ? <div className="chatbox-div">
                    <div className="username-display flex">
                        <img src={this.state.chatUser.photo} alt="avatar" />
                        <h2>{this.state.chatUser.name}</h2>
                    </div>
                    <div className="chatbox">
                        {this.state.chats.map((v, i) => {
                            return (
                                <div key={v + i} className={v.uid !== localStorage.getItem('uid') ? 'otherUser' : 'currentUser'}> <p>{v.message}</p></div>
                            )

                        })}
                    </div>
                    <div className="sendMassage flex">
                        <input type="text" style={{ width: '90%' }} value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
                        <button style={{ width: '10%' }} onClick={this.send_message}>send</button>
                    </div>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.users
})


export default connect(mapStateToProps, null)(ChatBox)
