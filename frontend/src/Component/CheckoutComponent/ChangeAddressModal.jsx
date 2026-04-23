import { Form, Input, message, Modal, Select } from "antd";
import "./ChangeAddressModal.css";
import { useEffect, useState } from "react";
import {
  fetchCitiesById,
  fetchDistrictsByCityId,
  fetchProvinces,
  fetchSubDistrictsByDistrictId,
} from "../../Util/apiService";

const ChangeAddressModal = ({ open, onCancel, form }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [subDistricts, setSubDistrict] = useState([]);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await fetchProvinces();

        setProvinces(data);
      } catch (err) {
        message.error(err);
      }
    };

    loadProvinces();
  }, []);

  const loadCities = async (value) => {
    try {
      const data = await fetchCitiesById(value);

      setCities(data);
    } catch (err) {
      message.error(err);
    }
  };
  const loadDistricts = async (value) => {
    try {
      const data = await fetchDistrictsByCityId(value);

      setDistrict(data);
    } catch (err) {
      message.error(err);
    }
  };
  const loadSubDistricts = async (value) => {
    try {
      const data = await fetchSubDistrictsByDistrictId(value);

      setSubDistrict(data);
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={() => form.submit()}
        styles={{
          container: {
            borderRadius: 0,
          },
        }}
      >
        <h4 className="heading4 change-address-title">
          Change Shipment Address
        </h4>
        <Form form={form} variant="outlined" layout="vertical">
          <Form.Item
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please select your Province" }]}
          >
            <Select
              placeholder="eg DKI Jakarta, Jawa Barat, Jawa Timur"
              options={provinces}
              showSearch={{ optionFilterProp: "label" }}
              onChange={(value) => {
                form.setFieldsValue({ city: null });
                loadCities(value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please select your City" }]}
          >
            <Select
              placeholder="eg Jakarta, Surabaya"
              options={cities}
              showSearch={{ optionFilterProp: "label" }}
              onChange={(value) => {
                form.setFieldsValue({ district: null });
                loadDistricts(value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Kecamatan/District"
            name="district"
            rules={[
              {
                required: true,
                message: "Please type your Kecamatan/District",
              },
            ]}
          >
            <Select
              placeholder="eg. "
              options={districts}
              showSearch={{ optionFilterProp: "label" }}
              onChange={(value) => {
                form.setFieldsValue({ subdistrict: null });
                loadSubDistricts(value);
              }}
            />
          </Form.Item>
          <Form.Item label="Kelurahan/Sub District" name="subdistrict">
            <Select
              placeholder="eg. "
              options={subDistricts}
              showSearch={{ optionFilterProp: "label" }}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please type your address" }]}
          >
            <Input placeholder="eg. Jl. Jend. Sudirman No. 123" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeAddressModal;
