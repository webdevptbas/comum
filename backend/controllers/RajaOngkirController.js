const axios = require("axios");
const BASE_URL = process.env.RAJAONGKIR_BASE_URL;

exports.getProvinces = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/destination/province`, {
      headers: { key: process.env.RAJAONGKIR_API_KEY },
    });

    const data = response?.data?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCitiesByProvinceId = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/destination/city/${req.params.id}`,
      {
        headers: { key: process.env.RAJAONGKIR_API_KEY },
      },
    );

    const data = response?.data?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDistrictsByCityId = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/destination/district/${req.params.id}`,
      {
        headers: { key: process.env.RAJAONGKIR_API_KEY },
      },
    );

    const data = response?.data?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubDistrictsByDistrictId = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/destination/sub-district/${req.params.id}`,
      {
        headers: { key: process.env.RAJAONGKIR_API_KEY },
      },
    );

    const data = response?.data?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
