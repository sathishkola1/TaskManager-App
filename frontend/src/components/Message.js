import {useState,React} from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
    const [show, setShow] = useState(true);
    if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
       {children}
      </Alert>
    );
  }
  return <div></div>
}

export default Message
