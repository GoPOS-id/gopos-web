import { DeleteOutline, EditOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, ButtonGroup, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { redirect, useLoaderData, useNavigate, useRouteLoaderData, useSearchParams } from "@remix-run/react";
import { ChangeEvent, useEffect, useState } from "react";
import Badge from "~/components/Badge";
import DataNotFound from "~/components/DataNotFound";
import { DataResponse } from "~/data-response";
import { inUserAllDto, inUserDto } from "~/dtos/userDtos";
import defaultTheme from "~/theme/theme";
import { FormDataUtils } from "~/utils/formconvertUtils";

export default function UserTable() {
  const [isPages, setPages] = useSearchParams();
  const navigate = useNavigate();
  const loaders = useLoaderData<DataResponse<inUserAllDto>>();
  const profile = useRouteLoaderData<DataResponse<inUserDto>>("routes/_main");
  var page = isPages.get("page");

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPages({ category: isPages.get("category")!, page: FormDataUtils.convertToString(value) });
  };

  useEffect(() => {
    if (loaders.statusCode != 200) navigate("/404");
  }, [loaders]);
  return (
    <>
      {loaders.data.users ? (
        <>
          <TableContainer component="div">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ textAlign: "start" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {profile?.data.role == "operator" || profile?.data.role == "administrator" ? <TableCell align="center">Action</TableCell> : <></>}
                </TableRow>
              </TableHead>
              <TableBody>
                {loaders.data.users.map((data, i) => (
                  <TableRow key={data.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, color: defaultTheme.palette.text.secondary }}>
                    <TableCell component="td" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell component="td" sx={{ textTransform: "capitalize" }} scope="row">
                      {data.fullname}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {data.username}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {data.email}
                    </TableCell>
                    <TableCell component="td" sx={{ textTransform: "capitalize" }} scope="row">
                      {data.role}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {data.verified_at ? <Badge color="success">Verified</Badge> : <Badge color="error">Not Verified</Badge>}
                    </TableCell>
                    {profile?.data.role == "operator" || profile?.data.role == "administrator" ? (
                      <TableCell component="td" scope="row" align="center">
                        {profile?.data.id != data.id ? (
                          <Button color="primary" sx={{ paddingX: "1rem" }} startIcon={<SearchOutlined />} onClick={() => navigate("/users/view/" + data.id)}>
                            View Details
                          </Button>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination count={loaders.data.pagination.total_pages} page={page == "null" ? 1 : FormDataUtils.convertToNumber(page)} onChange={handleChangePage} />
          </Stack>
        </>
      ) : (
        <DataNotFound />
      )}
    </>
  );
}
