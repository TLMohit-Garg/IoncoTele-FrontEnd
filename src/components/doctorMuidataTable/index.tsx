import React from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function DoctoctorMuidatatable() {
  const [users, setUsers] = React.useState<object[]>([]);
  console.log("backend data", users);

  const columns = [
    {
      name: "firstName",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "nationality",
      label: "Nationality",
      options: {
        customBodyRender: (value: any) => <>{value || "UK"}</>,
        filter: true,
        sort: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value: any) => (
          // <p className={`capitalize inline-block rounded-full ${value === "male" ? "redbg-red" : "bg-green-500"} text-white p-2`}>
          <p
            style={{
              backgroundColor: value === "MALE" ? "lightGrey" : "lightGrey",
              padding: "10px",
              borderRadius: "15px",
              paddingLeft: "22px",
            }}
          >
            {value || "Unknown" || "FEMALE"}
          </p>
        ),

        // customHeadRender: ({ index, ...rest }:any) => (
        //     <th key={index} style={{ background: 'blue', borderRadius:"22px" }}>
        //       {rest.label}
        //     </th>
        //   ),
        //   customBodyRender: (value: any) => (
        //     <p style={{ color: 'green' }}>{value}</p>
        //   ),
        filter: true,
        sort: false,
      },
    },
    {
      name: "speciality",
      label: "Speciality",
      options: {
        customBodyRender: (value: any) => <>{value || "Cancer Specialist"}</>,
        filter: true,
        sort: false,
      },
    },
    {
      name: "experience",
      label: "Experience",
      options: {
        customBodyRender: (value: any) => <>{value || "4"}</>,
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => (
          // <p className={`capitalize inline-block rounded-full ${value === "male" ? "redbg-red" : "bg-green-500"} text-white p-2`}>
          <p
            style={{
              backgroundColor: value === "In ACTIVE" ? "red" : "green",
              padding: "10px",
              borderRadius: "15px",
              paddingLeft: "22px",
            }}
          >
            {value || "ACTIVE"}
          </p>
        ),
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (
          value: any,
          tableMeta: any,
          updateDirection: any
        ) => <MoreVertIcon style={{ cursor: "pointer" }} />,
      },
    },
  ];

  // const columns = ["Name", "Company", "City", "State"];

  // const data = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //   ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    rowsPerPageOptions: [5, 10, 20, 30],
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontSize: 14,
      },
      palette: {
        background: {
          paper: "#0b4b72",
          default: "#0b4b72",
        },
        mode: "dark",
        text: {
          primary: "#fff", // Default text color for dark mode
        },
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              // padding:"10px 4px"
              // border:"1px solid red",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            },
            body: {
              backgroundColor: "lightgrey",
              color: "#001439",
            },
          },
        },
      },
    });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/doctorSignup");
        console.log(response, "sign in doctors data");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      //     finally {
      //       setLoading(false);
      //     }
    };

    fetchData();
  }, []);
  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Doctor's List"}
          data={users}
          // data={data}
          options={options}
          columns={columns}
        />
      </ThemeProvider>
    </>
  );
}

export default DoctoctorMuidatatable;
