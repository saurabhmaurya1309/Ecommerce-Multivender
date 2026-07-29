import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useEffect } from 'react';
import { deleteProduct, fetchSellerProducts } from '../../../State/seller/SellerProductSlice';
import { Avatar, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(
  ({ theme }) => ({
    '&:hover': {
      backgroundColor:
        theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  })
);
export default function ProductTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerProduct } = useAppSelector(state => state);
  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleDelete = async (
    productId: number
  ) => {

    const confirmed =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmed) return;

    try {

      await dispatch(
        deleteProduct(productId)
      ).unwrap();

      toast.success(
        "Product deleted successfully"
      );

    } catch (error: any) {

      toast.error(
        error.error ||
        "Failed to delete product"
      );

    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="center">
              Price
            </StyledTableCell>

            <StyledTableCell align="center">
              Discount
            </StyledTableCell>

            <StyledTableCell align="center">
              Stock
            </StyledTableCell>

            <StyledTableCell align="center">
              Status
            </StyledTableCell>

            <StyledTableCell align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item) => {

            const totalStock =
              (item as any).sizeQuantities?.reduce(
                (sum: number, size: any) => sum + size.quantity,
                0
              ) || 0;

            const isActive = (item as any).active;

            return (
              <StyledTableRow key={item.id}>

                {/* PRODUCT */}
                <StyledTableCell>

                  <div className="flex gap-4 items-center">

                    <Avatar
                      alt={item.title}
                      src={item.images?.[0]}
                      variant="rounded"
                      sx={{
                        width: 80,
                        height: 80
                      }}
                    />

                    <div>

                      <Typography
                        fontWeight={600}
                        sx={{
                          maxWidth: "250px"
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.color}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.category?.categoryId}
                      </Typography>

                    </div>

                  </div>

                </StyledTableCell>

                {/* PRICE */}
                <StyledTableCell align="center">

                  <Stack spacing={1}>
                    <Typography fontWeight={600}>
                      ₹{item.sellingPrice}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "gray"
                      }}
                    >
                      ₹{item.mrpPrice}
                    </Typography>
                  </Stack>

                </StyledTableCell>

                {/* DISCOUNT */}
                <StyledTableCell align="center">

                  <Chip
                    label={`${item.discountPercent}% OFF`}
                    color="success"
                    size="small"
                  />

                </StyledTableCell>

                {/* STOCK */}
                <StyledTableCell align="center">

                  <Chip
                    label={`${totalStock} Qty`}
                    color={
                      totalStock > 0
                        ? "primary"
                        : "error"
                    }
                  />

                </StyledTableCell>

                {/* STATUS */}
                <StyledTableCell align="center">

                  <Chip
                    label={isActive ? "ACTIVE" : "INACTIVE"}
                    color={isActive ? "success" : "error"}
                  />

                </StyledTableCell>

                {/* ACTIONS */}
                <StyledTableCell align="center">

                  <div className="flex justify-center gap-2">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/seller/products/edit/${item.id}`
                        )
                      }
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(item.id!)
                      }
                    >
                      <Delete />
                    </IconButton>

                  </div>

                </StyledTableCell>

              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}