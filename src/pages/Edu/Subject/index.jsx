import React, { Component } from "react";
import { Button, Table, Tooltip, Modal, message, Input } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { getSubjectList, getSecSubjectList ,updateSubjectList,delSubjectList} from './redux'
// import { reqDelSubject,reqUpdateSubject} from '@api/edu/subject'

import './index.less'


@connect(
  state => ({
    subjectList: state.subjectList
  }),
  { getSubjectList, getSecSubjectList, updateSubjectList,delSubjectList}
)
class Subject extends Component {
  state = {
    subjectId: ''
  }
  constructor() {
    super()

    this.page = 1
    // console.log(delOneSubject)
    // const {} = this.props
  }
  componentDidMount() {
    this.props.getSubjectList(1, 5)
  }
  handleChange = (page, pageSize) => {
    this.page = page
    this.props.getSubjectList(page, pageSize)

  }
  handleShowSizeChange = (current, pageSize) => {
    this.props.getSubjectList(current, pageSize)
  }
  
  handleExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }
  handleToAdd = () => {
    //新增，变成是导航
    this.props.history.push('/edu/Subject/add')
  }
  handleUpdate = ({ _id, title }) => () => {
    this.setState({
      subjectId: _id,
      title: title
    })
    this.title = title
      //记录旧的
  }
  handleUpdateChange = e => {
    this.setState({
      title:e.target.value
    })
  }
  handleCanle = () =>{
    this.setState({
      subjectId :'',
      title:''
    })
    
  }
  handleUpdateChrom = async() =>{
    //判断为空
    if(!this.state.title.trim()) {
      message.success('请输入正确的标题名称') 
      return 
    }
    if(this.state.title === this.title){
      message.success('标题名称不能相同') 
      return
    }
    let id = this.state.subjectId
    let title = this.state.title
    await this.props.updateSubjectList(id, title)
    message.success('修改成功')
    this.setState({
      subjectId :'',
      title:''
    })
    //刷新
   //this.props.getSubjectList(1,10)
  }
  handleDelete = record => () => {
    console.log(record)
    Modal.confirm({
      title: <>
        你想要删除<span style={{color:'red',margin:"0 10px"}}>{record.title}</span>吗？
      </>,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk: async () => {
        try {
          await this.props.delSubjectList(record._id)
          message.success('删除成功')
        } catch {
          message.error('删除失败')
        }
      }
    })
  }
  keyUp = (e) =>{
    if(e.keyCode===13){
      this.handleUpdateChrom()
    }
  }
  render() {

    const columns = [
      
      {
        title: '分类名称',  key: 'name',
        render: record => {
          //console.log(record)
          if (this.state.subjectId === record._id) {
            return <Input autoFocus style={{ width: 300 }} value={this.state.title} onChange={this.handleUpdateChange} onKeyUp={this.keyUp}></Input>
          }
          return record.title
        }
      },

      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: record => {
          //console.log(record)
          if (this.state.subjectId === record._id) {
            return (
              <>
                <Button type='primary' style={{ marginRight: 10 }} onClick={this.handleUpdateChrom}>确认</Button>
                <Button type='primary' onClick={this.handleCanle}>取消</Button>
              </>
            )

          } else {
            return (
              <>
                <Tooltip title="更新课程">
                  <Button type="primary" style={{ marginRight: 20, width: 50 }} icon={<FormOutlined />} onClick={this.handleUpdate(record)}>
                  </Button>
                </Tooltip>
                <Tooltip title="删除课程" placement="rightTop">
                  {/* <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={this.handleDelete()}> */}
                  <Button type="danger" style={{ marginRight: 20, width: 50 }} icon={<DeleteOutlined />} onClick={this.handleDelete(record)}> </Button>
                  {/* </Popconfirm> */}
                </Tooltip>
              </>
            )
          }
        },
        width: 200
      },
    ]
    return (
      <div className='subject' >
        <Tooltip title="新建课程">
          <Button type="primary" icon={<PlusOutlined />} className='subject-btn' onClick={this.handleToAdd}>
            新建
          </Button>
        </Tooltip>
        <Table
          columns={columns}
          expandable={{
            onExpand: this.handleExpand
          }}
          dataSource={
            this.props.subjectList.items
          }
          rowKey={'_id'}
          pagination={{
            total: this.props.subjectList.total,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
            defaultPageSize: 5,
            onChange: this.handleChange,
            onShowSizeChange: this.handleShowSizeChange,
            current: this.page
          }
          }
        />
      </div>
    )
  }
}
export default Subject
