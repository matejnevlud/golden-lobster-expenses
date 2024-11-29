'use client';
import {useRef, useState} from 'react';
import {
    Form,
    Input,
    InputNumber,
    DatePicker,
    Select,
    Upload,
    Button,
    Space,
    message, Modal
} from 'antd';
import {CameraOutlined, DeleteOutlined, PictureOutlined, PlusOutlined} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const ExpenseForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const paymentTypes = ['Cash', 'Credit Card', 'Bank Transfer', 'Other'];
    const categories = ['Travel', 'Meals', 'Office Supplies', 'Software', 'Other'];

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [cameraModalOpen, setCameraModalOpen] = useState(false);

    const cameraRef = useRef<HTMLInputElement>(null);
    const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newFile: UploadFile = {
                uid: `-${Date.now()}`,
                name: `Photo ${fileList.length + 1}`,
                status: 'done',
                url: URL.createObjectURL(file),
                originFileObj: file
            };
            setFileList([...fileList, newFile]);
        }
        // Reset input value to allow taking multiple photos
        if (cameraRef.current) {
            cameraRef.current.value = '';
        }
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // Transform the date-time value
            const dateTime = values.dateTime.toISOString();

            // Transform photos to URLs (implement your upload logic here)
            const photoUrls = fileList.map(file => file.url || '');

            const expenseData = {
                ...values,
                dateTime,
                photos: photoUrls,
            };

            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData),
            });

            console.log(response)

            if (!response.ok) throw new Error('Failed to submit expense');

            message.success('Expense submitted successfully');
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error(error)
            message.error('Failed to submit expense');
            console.error('Error submitting expense:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <CameraOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Business Expense</h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
            >
                <Form.Item
                    label="Date and Time"
                    name="dateTime"
                    rules={[{ required: true, message: 'Please select date and time' }]}
                >
                    <DatePicker
                        showTime
                        className="w-full"
                        format="YYYY-MM-DD HH:mm"
                    />
                </Form.Item>

                <Form.Item
                    label="Business"
                    name="business"
                    rules={[{ required: true, message: 'Please enter business name' }]}
                >
                    <Input placeholder="Enter business name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <TextArea
                        placeholder="Expense description"
                        rows={4}
                        className="w-full"
                    />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter price' }]}
                >
                    <InputNumber
                        placeholder="0.000"
                        className="w-full"
                        step="0.001"
                        min={0}
                        precision={3}
                        prefix="OMR"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\s?OMR\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item
                    label="VAT"
                    name="vat"
                    rules={[{ required: true, message: 'Please enter VAT' }]}
                >
                    <InputNumber
                        placeholder="0"
                        className="w-full"
                        step="1"
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value!.replace('%', '')}
                    />
                </Form.Item>

                <Form.Item
                    label="Payment Type"
                    name="paymentType"
                    rules={[{ required: true, message: 'Please select payment type' }]}
                >
                    <Select placeholder="Select payment type">
                        {paymentTypes.map(type => (
                            <Select.Option key={type} value={type}>{type}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category 1"
                    name="category1"
                    rules={[{ required: true, message: 'Please select category' }]}
                >
                    <Select placeholder="Select category">
                        {categories.map(category => (
                            <Select.Option key={category} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category 2"
                    name="category2"
                >
                    <Select placeholder="Select category">
                        {categories.map(category => (
                            <Select.Option key={category} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Note 1" name="note1">
                    <TextArea rows={2} placeholder="Additional notes" />
                </Form.Item>

                <Form.Item label="Note 2" name="note2">
                    <TextArea rows={2} placeholder="More notes" />
                </Form.Item>

                <Form.Item label="Photos">
                    <Space direction="vertical" className="w-full">
                        <Space wrap>
                            <Button
                                icon={<CameraOutlined />}
                                onClick={() => cameraRef.current?.click()}
                            >
                                Take Photo
                            </Button>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handlePhotoChange}
                                onPreview={handlePreview}
                                multiple
                                accept="image/*"
                                showUploadList={{
                                    showPreviewIcon: true,
                                    showRemoveIcon: true,
                                    showDownloadIcon: false
                                }}
                            >
                                <div>
                                    <CameraOutlined/>
                                    <div style={{marginTop: 8}}>Choose</div>
                                </div>
                            </Upload>
                        </Space>
                        <div className="text-xs text-gray-500">
                        Max 8 images. Each image must be less than 5MB.
                        </div>
                    </Space>

                    {/* Hidden camera input */}
                    <input
                        style={{ display: 'none' }}
                        ref={cameraRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-10"
                    >
                        Submit Expense
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img
                    alt="Preview"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};

export default ExpenseForm;