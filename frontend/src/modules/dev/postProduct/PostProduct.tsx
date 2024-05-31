import { Form, Placeholder } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import { IoVideocam } from 'react-icons/io5';

import '@assets/styles/styles.scss'


export default function PostProduct() {
    return (
        <div className='container'>
            <h1>Hình ảnh và video sản phẩm</h1>
            <div className='column'>
                <Form className='box1'>
                    <div className='upload_image_button'>
                        <input type="file" id="uploadBtn" />
                        <i><FaCamera /></i>
                        <label for="uploadBtn">Đăng từ 1 tới 5 ảnh</label>
                    </div>
                    <div className='upload_image_button'>
                        <input type="file" id="uploadBtn" />
                        <i><IoVideocam /></i>
                        <label for="uploadBtn">Đăng tối đa 1 video</label>
                    </div>
                </Form>
                <Form className='box2'>
                    <select class="form-select" aria-label="Default select example">
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
                        <input className="form-control" id="exampleFormControlInput1" placeholder="Tiêu đề tin đăng" maxLength={75}/>
                    </div>
                    <div className="mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Mô tả chi tiết'></textarea>
                    </div>
                    <div>Thông tin người bán</div>
                    <div /*Popover của địa chỉ*/>
                        <div className="mb-3">
                            <input className="form-control" id="exampleFormControlInput1" placeholder="Địa chỉ" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                        </div>
                        <div /*Modal của địa chỉ*/ class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="modal-title-fs-5" id="exampleModalLabel">Địa chỉ</div>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div /*Khung info địa chỉ*/ class="modal-body">
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Tỉnh, thành phố</option>
                                            <option value="1">Tp. Hồ Chí Minh</option>
                                            <option value="2">Đà Nẵng</option>
                                            <option value="3">Hà Nội</option>
                                        </select>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Quận, huyện, thị xã</option>
                                            <option value="1">Quận 1</option>
                                            <option value="2">Quận 2</option>
                                            <option value="3">Quận 3</option>
                                            <option value="4">Quận 4</option>
                                            <option value="5">Quận 5</option>
                                            <option value="6">Quận 6</option>
                                            <option value="7">Quận 7</option>
                                            <option value="8">Quận 8</option>
                                            <option value="9">Quận 9</option>
                                            <option value="10">Quận 10</option>
                                            <option value="11">Quận 11</option>
                                            <option value="12">Quận 12</option>
                                        </select>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Phường, xã, thị trấn</option>
                                            <option value="1">Tân Thới Hiệp</option>
                                            <option value="2">Tân Chánh Hiệp</option>
                                            <option value="3">Hiệp Thành</option>
                                        </select>
                                        <div className="mb-3">
                                            <input className="form-control" id="exampleFormControlInput1" placeholder="Địa chỉ cụ thể" />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        <button type="button" class="btn btn-primary">Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form_footer_button'>
                        <button id='xem_truoc_button' className="btn btn-primary" type="submit">Xem trước</button>
                        <button id='dang_tin_button' className="btn btn-primary" type="submit">Đăng tin</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
