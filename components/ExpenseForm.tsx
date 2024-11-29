'use client';
import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Button,
    message,
    Carousel,
    Modal,
} from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { v4 as uuidv4 } from 'uuid';
import {db} from "@/db";
import {expenses} from "@/db/schema";
import {createExpense} from "@/server_actions/data";

const { TextArea } = Input;

const ExpenseForm: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [carouselVisible, setCarouselVisible] = useState(false);

    const onFinish = async (values: any) => {
        const formData = {
            id: uuidv4(),
            ...values,
            dateTime: new Date(values.dateTime).toISOString(),
            photos: fileList.map(file => file.response?.url || ''),
            createdAt: new Date().toISOString(),
        };

        try {
            await createExpense(formData);
            form.resetFields();
            setFileList([]);
            message.success('Expense submitted successfully!');
        } catch (error) {
            message.error('Failed to submit expense');
            console.error('Error submitting expense:', error);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj!);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="expense-form"
            style={{ maxWidth: '600px', margin: '0 auto', padding: '10px' }}
        >
            <Form.Item
                name="dateTime"
                label="Date and Time"
                rules={[{ required: true }]}
                initialValue={new Date().toISOString().slice(0, 16)}
                style={{ width: '100%' }}
            >
                <input 
                    type="datetime-local" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontSize: '20px', width: '100%' }}
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

            <Form.Item label="Photos">
                <div style={{ marginBottom: 16 }}>
                    <Upload
                        listType="picture-card"
                        multiple
                        onChange={handleUploadChange}
                        fileList={fileList}
                        onPreview={handlePreview}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </div>

                {fileList.length > 0 && (
                    <Button
                        type="dashed"
                        block
                        onClick={() => setCarouselVisible(true)}
                        icon={<EyeOutlined />}
                    >
                        View Photos
                    </Button>
                )}

                <Modal
                    open={previewOpen}
                    title="Photo Preview"
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                >
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>

                <Modal
                    open={carouselVisible}
                    title="Photo Gallery"
                    footer={null}
                    width="90%"
                    style={{ maxWidth: '800px' }}
                    onCancel={() => setCarouselVisible(false)}
                >
                    <Carousel
                        dots
                        autoplay={false}
                        style={{
                            backgroundColor: '#f0f0f0',
                            padding: '20px',
                            borderRadius: '8px'
                        }}
                    >
                        {fileList.map((file, index) => (
                            <div key={file.uid}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '300px'
                                }}>
                                    <img
                                        src={file.url || (file.preview as string)}
                                        alt={`photo-${index + 1}`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '500px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Modal>
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
