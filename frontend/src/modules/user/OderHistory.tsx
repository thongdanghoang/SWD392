import './UserDashboard.scss';
import {ReactElement, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApplicationService} from '../shared/services/application.service.ts';
import {AppRoutingConstants} from '../shared/app-routing.constants.ts';
import {Table} from 'react-bootstrap';
import {formatToVietnameseCurrency, getLocalDateTime} from '../shared/utils.ts';
import {
  ExchangeRequestDto,
  ExchangeStatusDto,
  getExchangeStatusText
} from '../transactions/models/model.ts';

export default function UserDashboard(): ReactElement {
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const [histories, setHistories] = useState<ExchangeRequestDto[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.EXCHANGE_PATH)
        .then(response => {
          setHistories(response.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);

  return (
    <div className="user-dashboard container mt-5">
      <div className="row">
        <div className="exchange-histories col">
          <div className="p-2 p-lg-4 d-flex justify-content-between align-items-center">
            <div className="semibold-20 text-color-tertiary">
              Lịch sử giao dịch
            </div>
          </div>
          <div className="histories">
            <Table responsive borderless hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Số tiền</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history, index) => (
                  <tr
                    key={history.id}
                    onClick={() => navigate(`/exchange-detail/${history.id}`)}
                  >
                    <td>#{index + 1}</td>
                    <td>
                      {history?.creationDate
                        ? getLocalDateTime(history.creationDate)
                        : ''}
                    </td>
                    <td>
                      {history.status === ExchangeStatusDto.PENDING
                        ? getExchangeStatusText(history.status)
                        : history?.lastModificationDate
                          ? getLocalDateTime(history.lastModificationDate)
                          : ''}
                    </td>
                    <td>
                      {history.status === ExchangeStatusDto.ACCEPTED
                        ? formatToVietnameseCurrency(0)
                        : formatToVietnameseCurrency(0)}
                    </td>
                    <td>{getExchangeStatusText(history.status)}</td>
                  </tr>
                ))}
                {histories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Chưa có bất kì trao đổi nào được thực hiện
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
