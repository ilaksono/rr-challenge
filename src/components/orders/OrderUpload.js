import { CSVReader } from 'react-papaparse'
import React, { useState, useContext } from 'react';
import Modal from 'components/Modal';
import { Button, Table, Popover, OverlayTrigger } from 'react-bootstrap';
import * as hf from 'utils/helperFuncs';
import ax, { UPLOAD_ORDERS_LIST } from 'ax';
import AppContext from 'context/AppContext';
import UploadInstructionPopover from 'components/popovers/UploadInstructionPopover';

const OrderUpload = () => {

  const [csvBody, setCsvBody] = useState([]);
  const [show, setShow] = useState(false);
  const [csvHead, setCsvHead] = useState({});
  const [count, setCount] = useState(0);
  const {
    createError,
    updateOrdersLive,
    showLoadModal,
    hideLoadModal,
    createModal
  } = useContext(AppContext);

  const promptUpload = () => {
    createModal('Upload the orders?', 'Upload', handleUpload, 'Confirm');
  }

  const handleFileLoad = (body, head) => {
    setCsvBody(body);
    setCsvHead(head);
  }
  const handleRemoveFile = () => {
    setCsvHead({});
    setCsvBody([]);
    setCount(prev => prev + 1);
  }
  const handleUpload = async () => {
    const list = hf.csvArrayToJson(csvBody);
    try {
      showLoadModal()
      const res = await ax(UPLOAD_ORDERS_LIST, 'post', {
        list
      });
      if (res) {
        console.log(res, 'success');
        // updateOrdersLive(res);
      }
    } catch (er) {
      console.error(er);
      createError(er.message)
    }
    hideLoadModal();
  }
  return <>
    <a
      onClick={() => setShow(true)}
      data-toggle='tooltip'
      title='Upload Orders - Open Wizard'
      className='thumbnail text-center block-center lg-thumbnail'
    >
      <img
        style={{
          borderRadius: '50%',
          boxShadow: '1px 1px 3px 1px grey',
          padding: 2
        }}
        src='/images/upload.png'
        alt='Upload'
      />
      <p>Upload</p>
    </a>
    <Modal
      onHide={() => setShow(false)}
      show={show}
      modalTitle={
        <div className='flex'>Create and Update Orders - Upload CSV
          <OverlayTrigger
              triger='hover'
              placement='bottom'
              overlay={
                <UploadInstructionPopover
                />
              }>
          <a className='thumbnail ml-2'>
            <div>?</div>
          </a>
          </OverlayTrigger>
        </div>
      }
    >
      <CSVReader
        key={count}
        addRemoveButton
        onFileLoad={handleFileLoad}
        onRemoveFile={handleRemoveFile}
      >Drop or Click to Upload
        <img
          style={{
            height: 24,
            width: 24
          }}
          src='/images/upload.png'
          alt='Upload'
        />
      </CSVReader>
      <div className='text-center'>
        <strong>
          {
            csvHead.name &&
            <>
              {csvHead.name}
              <a className='thumbnail'
                data-toggle='toolip'
                title='Remove file'
                onClick={handleRemoveFile}
              >
                <img
                  src='/images/delete.png'
                />
              </a>
            </>
          }
        </strong>
      </div>
      <Button
        className='block-center mt-2'
        onClick={promptUpload}
      >Upload Records</Button>
      <Table
        responsive='xl'
        striped
        size='xl'
        className='order-upload-table'
      >
        <thead>
          <tr>
            {
              csvBody[0]?.data.map(label =>
                <td key={label}>
                  <strong>
                    {label}
                  </strong>
                </td>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            csvBody.slice(1).map((row, idx) =>
              <tr key={idx}>
                {
                  row.data?.map((each, idx) =>
                    <td
                    key={idx}
                    >{each}</td>
                  )
                }

              </tr>)
          }
        </tbody>
      </Table>
    </Modal>
  </>
}
export default OrderUpload;