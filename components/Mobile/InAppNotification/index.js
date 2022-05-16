import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import * as firebase from "firebase/app";
import { connect } from "react-redux";
import { getDeliveryStatus } from "../../../services/Delivery/singleorder/actions";

class InAppNotification extends Component {
  state = {
    open: false,
    inAppNotificationData: [],
  };
  audio = new Audio("/assets/audio/customer-notification.mp3");

  componentDidMount() {
    if (firebase.messaging.isSupported()) {
      navigator.serviceWorker.addEventListener("message", (message) => {
        if (
          message.data["firebase-messaging-msg-data"] &&
          message.data["firebase-messaging-msg-data"].data
        ) {
          this.audio.play();
          if ("vibrate" in navigator) {
            navigator.vibrate(["100", "150", "100", "100", "150", "100"]);
          }
          this.setState({
            open: true,
            inAppNotificationData:
              message.data["firebase-messaging-msg-data"].data,
          });
          if (
            message.data["firebase-messaging-msg-data"].data.unique_order_id
          ) {
            this.props.getDeliveryStatus(
              this.props.user.data.auth_token,
              message.data["firebase-messaging-msg-data"].data.unique_order_id
            );
          }
        }
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { inAppNotificationData, open } = this.state;
    return (
      <React.Fragment>
        <Dialog
          maxWidth={false}
          fullWidth={true}
          fullScreen={false}
          open={open}
          onClose={this.handleClose}
          disableBackdropClick={true}
        >
          <DialogTitle id="responsive-dialog-title">
            {inAppNotificationData.title}
          </DialogTitle>

          <DialogContent dividers>
            <p className="mb-2">{inAppNotificationData.message}</p>

            {inAppNotificationData.image && (
              <img
                src={inAppNotificationData.image}
                className="img-fluid"
                alt={inAppNotificationData.title}
              />
            )}

            <div className="inAppNotificationActions mt-3">
              <button
                className={`btn inANClose ${inAppNotificationData.click_action &&
                  "mr-2"}`}
                onClick={() => this.setState({ open: false })}
              >
                {localStorage.getItem("inAppCloseButton")}
              </button>
              {inAppNotificationData.click_action && (
                <a
                  className="btn inANLink"
                  href={inAppNotificationData.click_action}
                >
                  {localStorage.getItem("inAppOpenLinkButton")}
                </a>
              )}
            </div>
            <div
              className="alert-notify-bell"
              style={{ top: "20px", bottom: "auto" }}
            >
              <i
                className="si si-bell"
                style={{ color: localStorage.getItem("storeColor") }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  deliveryStatus: state.single_delivery_order.get_delivery_status,
});

export default connect(
  mapStateToProps,
  {
    getDeliveryStatus,
  }
)(InAppNotification);
