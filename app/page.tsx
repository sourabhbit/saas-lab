"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import PaginatedTable from "./components/table";
import { currencySymbol } from "./utils/currencyFormatter";

export interface DataType {
  "s.no": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": Date;
  location: string;
  "percentage.funded": number;
  "num.backers": string;
  state: string;
  title: string;
  type: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjects();
  }, []);

  const columns = [
    {
      key: "s.no",
      header: "S.No.",
      render: (value: number) => `${value}`,
    },
    {
      key: "percentage.funded",
      header: "Percentage Funded",
      render: (value: number) => `${value}%`,
    },
    {
      key: "amt.pledged",
      header: "Amount Pledged",
      render: (value: number, row: DataType) =>
        currencySymbol(row.currency, value),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SaaS Labs</h1>
      <PaginatedTable data={data} columns={columns} recordLimit={5} />
    </div>
  );
}
