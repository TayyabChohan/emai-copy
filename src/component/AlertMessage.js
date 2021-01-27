import React, { Component } from "react";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
class AlertMessage extends Component {
  render() {
    return (
      <div>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
          onCloseButtonClick
        />
      </div>
    );
  }
}

export default AlertMessage;
