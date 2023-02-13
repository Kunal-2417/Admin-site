export const userColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "country",
    headerName: "Country",
    width: 80,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "type",
    headerName: "Type",
    width: 180,
  },

  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "disc",
    headerName: "Description",
    width: 220,
  },

  {
    field: "price",
    headerName: "Price",
    width: 80,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 110,
  },
];