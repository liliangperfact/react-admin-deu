import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, Divider, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { reqGetSubject ,reqAddSecSubject,reqUpdateSecSubject} from '@api/edu/subject'
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}

export default class index extends Component {
  page = 1
  state = {
    total: 0,
    items: [],
    
  }
  async componentDidMount() {
    //请求一级数据
    const res = await reqGetSubject(this.page++, 10)
    this.setState(res)
  }
  handleGetSubjectList = async () => {
    console.log(66)
    const res = await reqGetSubject(this.page++, 10)
    const newItems = [ ...this.state.items, ...res.items ]
    console.log(newItems)
    this.setState({
      items: newItems
    })
  }

  onFinish = async  values =>{
    //let title = this.
   await reqAddSecSubject(values.subjectname,values.parentid)
    this.props.history.push('/edu/subject/list')
    message.success('添加成功')
  }
  render() {
    //console.log(this.state.items)
    // const {items,total} = this
    return (
      <Card

        title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='title' style={{ marginLeft: 10 }}>新增课程</span>
          </>
        }
      >
        <Form
          {...layout}
          name='subject'
        onFinish={this.onFinish}
        //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='课程分类名称'
            name='subjectname'
            rules={[
              {
                required: true,
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
              dropdownRender={menu => {
                return (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }}></Divider>
                    {this.state.total <= this.state.items.length ? (<Button type='link' style={{ margin: '4px 0', color: 'red' }}>
                      没有更多数据了
                    </Button>) : (<Button type='link' onClick={this.handleGetSubjectList} style={{ margin: '4px 0' }}>
                      点击加载更多数据
                    </Button>)}
                  </div>
                )
              }}>
              <Select.Option value={0} key={0}>
                {'一级菜单'}
              </Select.Option>
              {this.state.items.map(item => (<Select.Option key={item._id} value={item._id}>{item.title}</Select.Option>))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' >
              Submit
          </Button>
          </Form.Item>
        </Form>

      </Card>
    )
  }
}
