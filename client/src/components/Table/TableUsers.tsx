'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import {
  BadgeDelta,
  type DeltaType,
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Card
} from '@tremor/react';
import { useState } from 'react';

export interface SalesPerson {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
}

export const salesPeople: SalesPerson[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming'
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average'
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming'
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming'
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming'
  }
];

const deltaTypes: Record<string, DeltaType> = {
  average: 'unchanged',
  overperforming: 'moderateIncrease',
  underperforming: 'moderateDecrease'
};

const TableUsers = (): JSX.Element => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const isSalesPersonSelected = (salesPerson: SalesPerson): boolean =>
    (salesPerson.status === selectedStatus || selectedStatus === 'all') &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSalesPeople = salesPeople
    .filter((item) => isSalesPersonSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    salesPeople.filter((item) => isSalesPersonSelected(item)).length /
      itemsPerPage
  );

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Performance History </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows sales performance per employee"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedNames}
          placeholder="Select Salespeople..."
        >
          {salesPeople.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
          <SelectItem value="all">All Performances</SelectItem>
          <SelectItem value="overperforming">Overperforming</SelectItem>
          <SelectItem value="average">Average</SelectItem>
          <SelectItem value="underperforming">Underperforming</SelectItem>
        </Select>
      </div>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Leads</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Sales ($)
              </TableHeaderCell>
              <TableHeaderCell className="text-right">
                Quota ($)
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Variance</TableHeaderCell>
              <TableHeaderCell className="text-right">Region</TableHeaderCell>
              <TableHeaderCell className="text-right">Status</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentSalesPeople.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.leads}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell className="text-right">{item.quota}</TableCell>
                <TableCell className="text-right">{item.variance}</TableCell>
                <TableCell className="text-right">{item.region}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="mt-6">
        <nav className="flex justify-center">
          <ul className="flex items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => {
                    paginate(index + 1);
                  }}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableUsers;
