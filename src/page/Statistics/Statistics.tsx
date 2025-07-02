import { Card, Statistic, Row, Col, Spin } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DatabaseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { statisticsApi } from "@/entities/statistics/api/statistics.api";

export const StatisticsPanel: React.FC = () => {
  const { data, isLoading, isError } = statisticsApi.useStatisticsQuery();

  if (isLoading) return <Spin size="large" />;
  if (isError || !data) return <div>Ошибка при загрузке статистики</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Панель статистики</h1>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Всего пользователей"
              value={data.users_count}
              valueStyle={{ color: "#3f8600" }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Всего файлов"
              value={data.files_count}
              valueStyle={{ color: "#1890ff" }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Верифицированные"
              value={data.verified_files}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Неверифицированные"
              value={data.unverified_files}
              valueStyle={{ color: "#faad14" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Размер исходных файлов"
              value={data.file_sizes.original_files_human}
              valueStyle={{ color: "#722ed1" }}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Размер TXT файлов"
              value={data.file_sizes.txt_files_human}
              valueStyle={{ color: "#13c2c2" }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Активные Задачи"
              value={data.celery.active_tasks}
              valueStyle={{ color: "#cf1322" }}
              prefix={<SyncOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
