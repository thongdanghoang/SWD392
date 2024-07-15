import React, {ReactElement, useEffect, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {ModalProps} from '../../shared/components/modal/ModalContext.tsx';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
import {
  getDistrictsByProvinceCode,
  getProvinces,
  getWardByCode,
  getWardsByDistrictCode
} from 'vn-local-plus';

type Province = {
  code: string;
  name: string;
};

type District = {
  provinceCode: string;
  code: string;
  name: string;
};

type Ward = {
  provinceCode: string;
  districtCode: string;
  code: string;
  name: string;
};

export interface AddressDto {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  addressDetail: string;
  fullName?: string;
}

const AddressFormModal = ({
  hideModal,
  onSubmit,
  data
}: ModalProps): ReactElement => {
  const [formData, setFormData] = useState<AddressDto>({
    provinceCode: data?.provinceCode || '',
    districtCode: data?.districtCode || '',
    wardCode: data?.wardCode || '',
    addressDetail: data?.addressDetail || ''
  });
  const [formProvinces, setFormProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    data?.provinceCode || ''
  );
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    data?.districtCode || ''
  );
  const [wards, setWards] = useState<Ward[]>([]);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() && onSubmit) {
      formData.fullName = getWardByCode(formData.wardCode).fullName;
      formData.addressDetail = formData.addressDetail.trim();
      onSubmit(formData);
      hideModal();
    }
    setValidated(true);
  };

  useEffect(() => {
    setFormProvinces(getProvinces());
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setDistricts(getDistrictsByProvinceCode(selectedProvince));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setWards(getWardsByDistrictCode(selectedDistrict));
    }
  }, [selectedDistrict]);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header className="justify-content-center">
        <Modal.Title className="semibold-20 text-color-quaternary">
          Địa chỉ
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="d-flex flex-column gap-4">
          <Form.Group controlId="formProvince">
            <Form.Control
              className="form-select semibold-16 text-color-quaternary"
              as="select"
              required
              value={selectedProvince}
              onChange={e => {
                setSelectedProvince(e.target.value);
                setFormData({...formData, provinceCode: e.target.value});
              }}
            >
              <option value="" disabled>
                Tỉnh, thành phố
              </option>
              {formProvinces.map((province, index) => (
                <option key={index} value={province.code}>
                  {province.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Vui lòng chọn tỉnh, thành phố
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDistrict">
            <Form.Control
              className="form-select semibold-16 text-color-quaternary"
              as="select"
              required
              value={selectedDistrict}
              onChange={e => {
                setSelectedDistrict(e.target.value);
                setFormData({...formData, districtCode: e.target.value});
              }}
            >
              <option value="" disabled>
                Quận, huyện, thị xã
              </option>
              {districts?.map((district, index) => (
                <option key={index} value={district.code}>
                  {district.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Vui lòng chọn quận, huyện, thị xã
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formWard">
            <Form.Control
              className="form-select semibold-16 text-color-quaternary"
              as="select"
              required
              value={formData.wardCode}
              onChange={e =>
                setFormData({...formData, wardCode: e.target.value})
              }
            >
              <option value="" disabled>
                Phường, xã, thị trấn
              </option>
              {wards?.map((ward, index) => (
                <option key={index} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Vui lòng chọn phường, xã, thị trấn
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDetailedAddress">
            <Form.Control
              className="semibold-16 text-color-quaternary"
              type="text"
              required
              pattern={'^(?=.*\\S).+$'}
              maxLength={100}
              placeholder="Địa chỉ chi tiết"
              value={formData.addressDetail}
              onChange={e =>
                setFormData({...formData, addressDetail: e.target.value.trim()})
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập địa chỉ chi tiết
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <AppButton className="flex-grow-1" variant="primary" type="submit">
            Xong
          </AppButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddressFormModal;
