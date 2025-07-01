import { Card, Statistic, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export const StatisticsPanel: React.FC = () => {
   const [stats, setStats] = useState({
      totalFiles: 0,
      verifiedFiles: 0,
      unverifiedFiles: 0,
      conversionsInProgress: 0,
      totalSizeMB: 0,
   });

   useEffect(() => {
      // Здесь в будущем будет API-запрос
      // Пока что моковые данные
      setStats({
         totalFiles: 152,
         verifiedFiles: 60,
         unverifiedFiles: 92,
         conversionsInProgress: 10,
         totalSizeMB: 1342.5,
      });
   }, []);

   return (
      <div className="p-6">
         <h1 className="text-2xl font-semibold mb-6">Панель статистики</h1>

         <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={8}>
               <Card>
                  <Statistic
                     title="Всего файлов"
                     value={stats.totalFiles}
                     valueStyle={{ color: "#3f8600" }}
                     prefix={<ArrowUpOutlined />}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
               <Card>
                  <Statistic
                     title="Верифицированные"
                     value={stats.verifiedFiles}
                     valueStyle={{ color: "#1890ff" }}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
               <Card>
                  <Statistic
                     title="Неверифицированные"
                     value={stats.unverifiedFiles}
                     valueStyle={{ color: "#faad14" }}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
               <Card>
                  <Statistic
                     title="Конвертация в процессе"
                     value={stats.conversionsInProgress}
                     valueStyle={{ color: "#cf1322" }}
                     suffix={<ArrowDownOutlined />}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
               <Card>
                  <Statistic
                     title="Общий объём (MB)"
                     value={stats.totalSizeMB}
                     precision={1}
                     valueStyle={{ color: "#722ed1" }}
                  />
               </Card>
            </Col>
         </Row>
      </div>
   );
};
