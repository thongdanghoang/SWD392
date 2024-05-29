import React from 'react'
import { Form, Placeholder } from 'react-bootstrap'
import { FaCamera } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import './Post_Product.scss'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function Post_Product() {
    //==================================================================================================
    //Popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //==================================================================================================
    //Address_Form
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');

    const handleChange = (event) => {
        setCity(event.target.value as string);
        setDistrict(event.target.value);
    };
    //==================================================================================================
    return (
        <div className='container'>
            <h1>hình ảnh và video sản phẩm</h1>
            <div className='column'>
                <Form className='box1'>
                    <div className='upload_image_button'>
                        <input type="file" id="uploadBtn" />
                        <i><FaCamera /></i>
                        <label for="uploadBtn">Chọn ảnh</label>
                    </div>
                    <div className='upload_image_button'>
                        <input type="file" id="uploadBtn" />
                        <i><IoVideocam /></i>
                        <label for="uploadBtn">Chọn video</label>
                    </div>
                </Form>
                <Form className='box2'>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Danh mục tin đăng</option>
                        <option value="1">Thời trang nam</option>
                        <option value="2">Thời trang nữ</option>
                        <option value="3">Giày dép</option>
                        <option value="4">Phụ kiện & Trang sức</option>
                        <option value="5">Mỹ phẩm</option>
                        <option value="6">Đồ điện tử</option>
                        <option value="7">Đồ gia dụng</option>
                        <option value="8">Nội thất</option>
                        <option value="9">Sách</option>
                        <option value="10">Văn phòng phẩm</option>
                        <option value="11">Giải trí</option>
                        <option value="12">Thể thao</option>
                    </select>
                    <div><h2 className='post_title_detail'>Thông tin chi tiết</h2></div>

                    <div>Tình trạng</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Đã sử dụng</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Mới</label>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" id="exampleFormControlInput1" placeholder="Loại sản phẩm" />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                            Tôi muốn cho tặng miễn phí
                        </label>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" id="exampleFormControlInput1" placeholder="Giá đề xuất" />
                    </div>

                    <div><h2 className='post_title_detail'>Tiêu đề Tin đăng và Mô tả chi tiết</h2></div>
                    <div className="mb-3">
                        <input className="form-control" id="exampleFormControlInput1" placeholder="Tiêu đề tin đăng" />
                    </div>
                    <div className="mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Mô tả chi tiết'></textarea>
                    </div>
                    <div>Thông tin người bán</div>
                    <div>
                        <div className="mb-3">
                            <input onClick={handleClick} className="form-control" id="exampleFormControlInput1" placeholder="Địa chỉ" />
                        </div>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 250, left: 380 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                            }}
                        >
                            <div className='address_Popover'>
                                <Typography variant='h3' sx={{ p: 2, textAlign:"center"}}>Nhập địa chỉ của bạn</Typography>
                                <div className='address_Popover_item'>
                                <Box sx={{ minWidth: 150 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="list_of_city" variant='filled'>Tỉnh, thành phố</InputLabel>
                                        <Select
                                            labelId="list_of_city"
                                            id="City"
                                            value={city}
                                            label="City"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"TpHCM"}>Tp.HCM</MenuItem>
                                            <MenuItem value={"DaNang"}>Đà Nẵng</MenuItem>
                                            <MenuItem value={"HaNoi"}>Hà Nội</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                </div>
                                <div className='address_Popover_item'>
                                <Box sx={{ minWidth: 150 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" variant='filled'>Quận, huyện, thị xã</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="District"
                                            value={district}
                                            label="District"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Quận 1</MenuItem>
                                            <MenuItem value={2}>Quận 2</MenuItem>
                                            <MenuItem value={3}>Quận 3</MenuItem>
                                            <MenuItem value={4}>Quận 4</MenuItem>
                                            <MenuItem value={5}>Quận 5</MenuItem>
                                            <MenuItem value={6}>Quận 6</MenuItem>
                                            <MenuItem value={7}>Quận 7</MenuItem>
                                            <MenuItem value={8}>Quận 8</MenuItem>
                                            <MenuItem value={9}>Quận 9</MenuItem>
                                            <MenuItem value={10}>Quận 10</MenuItem>
                                            <MenuItem value={11}>Quận 11</MenuItem>
                                            <MenuItem value={12}>Quận 12</MenuItem>
                                            <MenuItem value={13}>Quận Tân Bình</MenuItem>
                                            <MenuItem value={14}>Quận Bình Tân</MenuItem>
                                            <MenuItem value={15}>Quận Bình Thạnh</MenuItem>
                                            <MenuItem value={16}>Quận Tân Phú</MenuItem>
                                            <MenuItem value={17}>Quận Gò Vấp</MenuItem>
                                            <MenuItem value={18}>Quận Phú Nhuận</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                </div>
                                <div className='address_Popover_item'>
                                    <FormControl fullWidth>
                                        <TextField sx={{ minWidth: 180 }} id="filled-basic" label="Phường, xã, thị trấn" variant="filled" />
                                    </FormControl>
                                    </div>
                                    <div className='address_Popover_item'>
                                    <FormControl fullWidth>
                                        <TextField sx={{ minWidth: 180 }} id="filled-basic" label="Địa chỉ cụ thể" variant="filled" />
                                    </FormControl>
                                    </div>
                                </div>
                            
                        </Popover>
                    </div>
                    <button className="btn btn-primary" type="submit">Xem trước</button>
                    <button className="btn btn-primary" type="submit">Đăng tin</button>
                </Form>
            </div>
        </div>
    )
}
