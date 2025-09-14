import React from 'react';
import { Card, Button, Typography, Space, Badge } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';

const { Text, Title } = Typography;

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  isNew = false,
  isSale = false
}) => {
  return (
    <Card
      className="mobile-card relative overflow-hidden"
      cover={
        <div className="relative">
          <img
            alt={name}
            src={image}
            className="w-full h-48 object-cover"
          />
          {(isNew || isSale) && (
            <div className="absolute top-2 left-2">
              {isNew && <Badge.Ribbon text="New" color="green" />}
              {isSale && <Badge.Ribbon text="Sale" color="red" />}
            </div>
          )}
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full"
          />
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          className="w-full"
        >
          Add to Cart111
        </Button>
      ]}
    >
      <div className="p-2">
        <Title level={5} className="mb-2 line-clamp-2">
          {name}
        </Title>
        
        <Space className="mb-2">
          <StarFilled className="text-yellow-400" />
          <Text>{rating}</Text>
          <Text type="secondary">({reviewCount})</Text>
        </Space>
        
        <Space>
          <Text strong className="text-lg text-blue-600">
            ${price}
          </Text>
          {originalPrice && (
            <Text delete type="secondary">
              ${originalPrice}
            </Text>
          )}
        </Space>
      </div>
    </Card>
  );
};
