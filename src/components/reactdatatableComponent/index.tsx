import { Button, IconButton } from '@mui/material';
import React from 'react'
import DataTable from 'react-data-table-component';
import differenceBy from 'lodash/differenceBy';
import tableDataItems from "./data.json";
import Card from '@mui/material/Card';
import Delete from '@mui/icons-material/Delete';

interface Row {
    id: number;
    title: string;
    year: string;
  }

export default function ReactDataTable () {
const [selectedRows, setSelectedRows] = React.useState<Row[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState<Row[]>(tableDataItems);
  console.log('Initial Data:', data);

  
const contextActions = (deleteHandler: React.MouseEventHandler<HTMLButtonElement> | undefined) => (
	<IconButton color="secondary" onClick={deleteHandler}>
		<Delete />
	</IconButton>
);

    const caseInsensitiveSort =(rowA: any, rowB: any)=> {
        const a = rowA.title.toLowerCase();
        const b = rowB.title.toLowerCase();
        if (a > b) {
            return 1;
        }
    
        if (b > a) {
            return -1;
        }
    
        return 0;
    }
    const handleRowSelected = React.useCallback((state:any) => {
        console.log('Selected Rows:', state.selectedRows);
		setSelectedRows(state.selectedRows);
	}, []);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.id).join(", ")}?`)) {
          console.log('Before delete:', data);
          console.log('Selected Rows:', selectedRows);
          const updatedData = differenceBy(data, selectedRows, 'id');
          console.log('After delete:', updatedData);
          setToggleCleared(!toggleCleared);
          setData(updatedData);
        }
      };
    
    const renderContextActions = () => {
        if (selectedRows.length === 0) return null;
      
        return (
          <Button
            onClick={handleDelete}
            style={{ backgroundColor: 'red', color: 'white', margin: '100px', zIndex: 9999 }}
          >
            Delete
          </Button>
        );
      };
    const columns = [
        {
            name: 'Title',
            selector: (row: { title: any; }) => row.title,
            sortable: true,
            sortFunction: caseInsensitiveSort,
        },
        {
            name: 'Year',
            selector: (row: { year: any; }) => row.year,
            sortable: true,
            sortFunction: caseInsensitiveSort,

        },
    ];
    const deleteAll = () => {
		const rows = selectedRows.map(r => r.title);
		
		if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
			setToggleCleared(!toggleCleared);
			setData(differenceBy(data, selectedRows, 'name'));
		}
	};
    
  return (
    <>
    <Card style={{ height: '100%' }}>
    <DataTable
			columns={columns}
			data={data}
            selectableRows
            pagination 
            contextActions={contextActions(deleteAll)}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
		/>
    </Card>

    </>
  )
}
