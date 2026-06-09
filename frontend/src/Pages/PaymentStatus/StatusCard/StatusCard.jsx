import { Button, Card, Space, Typography } from "antd";
import statusConfig from "./config";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const StatusCard = ({ status, orderId }) => {
  const current = statusConfig[status];
  const navigate = useNavigate();

  return (
    <Card>
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Title level={1}>{current.icon}</Title>

        <Title level={3}>{current.title}</Title>

        <Text strong>Order #{orderId}</Text>

        <Text>{current.description}</Text>

        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`${current.primaryLink}`)}
          >
            {current.primaryText}
          </Button>

          <Button onClick={() => navigate(`${current.secondaryLink}`)}>
            {current.secondaryText}
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default StatusCard;
