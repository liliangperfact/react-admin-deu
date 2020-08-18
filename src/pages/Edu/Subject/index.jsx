import React, { Component } from "react";
import { Button, Table, Tooltip, Popconfirm } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { getSubjectList, getSecSubjectList, delOneSubject } from './redux'

import './index.less'


@connect(
  state => ({
    subjectList: state.subjectList
  }),
  { getSubjectList, getSecSubjectList, delOneSubject }
)
class Subject extends Component {
  constructor() {
    super()
    this.page = 1
    // console.log(delOneSubject)
    // const {} = this.props
    this.columns = [
      { title: '分类名称', dataIndex: 'title', key: 'name' },

      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () =>

          <>
            <Tooltip title="更新课程">
              <Button type="primary" style={{ marginRight: 20, width: 50 }} icon={<FormOutlined />}>
              </Button>
            </Tooltip>
            <Tooltip title="删除课程" placement="rightTop">
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={this.handleDelete}>
                <Button type="danger" style={{ marginRight: 20, width: 50 }} icon={<DeleteOutlined />} > </Button>
              </Popconfirm>
            </Tooltip>
          </>,
        width: 200
      },
    ];
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
  handleDelete = (id) =>{
    //this.props.delOneSubject('5ee171adc311f5151c52332a')
    //console.log(666)
  }
  handleExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }
  render() {
    return (
      <div className='subject' >
        <Tooltip title="新建课程">
          <Button type="primary" icon={<PlusOutlined />} className='subject-btn'>
              新建
          </Button>
        </Tooltip>
        <Table
          columns={this.columns}
          expandable={{
            // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            // rowExpandable: record => record.name !== 'Not Expandable',
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
