import React, { useState } from 'react';
import {
  Form,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';

const { TextArea } = Input;

const ExpenseForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: any) => {
    const formData = {
      ...values,
      dateTime: values.dateTime.toISOString(),
      photos: fileList.map(file => file.response?.url || ''),
    };

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        message.success('Expense saved successfully');
        form.resetFields();
        setFileList([]);
      } else {
        message.error('Failed to save expense');
      }
    } catch (error) {
      message.error('Error saving expense');
    }
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="expense-form"
      style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
    >
      <Form.Item
        name="dateTime"
        label="Date and Time"
        rules={[{ required: true }]}
      >
        <DatePicker
          showTime
          style={{ width: '100%' }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>

      <Form.Item
        name="business"
        label="Business"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value!.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="paymentType"
        label="Payment Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="cash">Cash</Select.Option>
          <Select.Option value="card">Card</Select.Option>
          <Select.Option value="transfer">Bank Transfer</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="vat"
        label="VAT (%)"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} max={100} />
      </Form.Item>

      <Form.Item
        name="category1"
        label="Category 1"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="travel">Travel</Select.Option>
          <Select.Option value="meals">Meals</Select.Option>
          <Select.Option value="supplies">Supplies</Select.Option>
          <Select.Option value="services">Services</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="category2"
        label="Category 2"
      >
        <Select allowClear>
          <Select.Option value="business">Business</Select.Option>
          <Select.Option value="personal">Personal</Select.Option>
          <Select.Option value="client">Client</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="note1"
        label="Note 1"
      >
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item
        name="note2"
        label="Note 2"
      >
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item
        label="Photos"
      >
        <Upload
          action="/api/upload"
          listType="picture"
          multiple
          onChange={handleUploadChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Upload Photos</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Save Expense
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
