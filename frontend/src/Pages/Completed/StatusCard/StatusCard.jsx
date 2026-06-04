import { Button, Card, Space, Typography } from "antd";
import statusConfig from "./config";

const { Title, Text } = Typography;

const StatusCard = ({ status, orderId, onPrimaryClick, onSecondaryClick }) => {
  const current = statusConfig[status];

  return (
    <Card>
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Title level={1}>{current.icon}</Title>

        <Title level={3}>{current.title}</Title>

        <Text strong>Order #{orderId}</Text>

        <Text>{current.description}</Text>

        <Space>
          <Button type="primary" onClick={onPrimaryClick}>
            {current.primaryText}
          </Button>

          <Button onClick={onSecondaryClick}>{current.secondaryText}</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default StatusCard;
