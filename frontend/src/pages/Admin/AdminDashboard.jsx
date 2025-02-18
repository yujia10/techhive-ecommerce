import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isSalesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: isOrdersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart:{
        type: "line"
      },
      tooltip: {
        theme: "dark"
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Sales Trend",
        align: "left"
      },
      grid: {
        borderColor: "#ccc"
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      // Format sales data for the chart
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x), // Set X-axis labels
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) }, // Set Y-axis data
        ],
      }));
    }
  }, [salesDetail]); // Runs when salesDetail changes

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard
