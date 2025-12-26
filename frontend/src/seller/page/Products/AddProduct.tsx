import { AddPhotoAlternate, Category, Close } from '@mui/icons-material'
import { Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { uploadToCloudinary } from '../../../utils/uploadToCloudinary';
import { colors } from '../../../data/Filter/colors';
import { mainLevelCategory } from '../../../data/category/mainLevelCategory';
import { beautyLevelTwo } from '../../../data/category/level two/beautyLevelTwo';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo';
import { kidsLevelTwo } from '../../../data/category/level two/kidsLevelTwo';
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';
import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree';
import { kidsLevelThree } from '../../../data/category/level three/kidsLevelThree';
import { menLevelThree } from '../../../data/category/level three/menLevelThree';
import { woemenLevelThree } from '../../../data/category/level three/womenLevelThree';
import { sizes } from '../../../data/Filter/sizes';
import { useAppDispatch } from '../../../State/Store';
import { createProduct } from '../../../State/seller/SellerProductSlice';

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbarOpen, setSnakbarOpen] = useState(false);
  const dispatch= useAppDispatch()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
     dispatch(createProduct({request:values, jwt: localStorage.getItem("jwt") || ""}))

    }
  })
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true)
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);

    setUploadImage(false)
  }
  const handleRemoveImage = async (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  }
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  }
  const categoryTwo = [
    ...beautyLevelTwo,
    ...electronicsLevelTwo,
    ...furnitureLevelTwo,
    ...kidsLevelTwo,
    ...menLevelTwo,
    ...womenLevelTwo,
  ]
  const categoryThree = [
    ...beautyLevelTwo,
    ...electronicsLevelThree,
    ...furnitureLevelThree,
    ...kidsLevelThree,
    ...menLevelThree,
    ...woemenLevelThree
  ]
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input type="file"
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className='relative' htmlFor="fileInput">
              <span className='w-24 h-24 cursor-pointer flex items-center  justify-center 
                p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>
              {
                uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center '>
                    <CircularProgress />
                  </div>
                )
              }
            </label>

            <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index) => (
                <div className='relative'>
                  <img className='w-24 h-24 object-cover'
                    key={index}
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=''
                    size='small'
                    color='error'
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none"
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>

              ))}
            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id='title'
              name='title'
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id='description'
              name='description'
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id='mrp_price'
              name='mrpPrice'
              label="MRP Price"
              type='number'
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id='sellingPrice'
              name='sellingPrice'
              label="Selling Price"
              type='number'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId='color-label'
                id='color'
                name='color'
                value={formik.values.color}
                onChange={formik.handleChange}
                label="color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {

                  colors.map((color, index) => <MenuItem value={color.name}>
                    <div className='flex gap-3'>
                      <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full ${color.name === "white" ? "border" : ""}`}>
                      </span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>)
                }
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              required
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                {sizes.map((size) => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.label}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId='category-label'
                id='category'
                name='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                {
                  mainLevelCategory.map((item) => <MenuItem value={item.categoryId}>
                    {item.name}
                  </MenuItem>)
                }
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth required disabled={!formik.values.category}>
              <InputLabel>Second Category</InputLabel>
              <Select
                name="category2"
                value={formik.values.category2}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("category3", "");
                }}
              >
                {childCategory(categoryTwo, formik.values.category).map((item: any) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl fullWidth required disabled={!formik.values.category2}>
              <InputLabel>Third Category</InputLabel>
              <Select
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Third Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {formik.values.category2 &&
                  childCategory(
                    categoryThree,
                    formik.values.category2
                  ).map((item: any) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
            >{
                false ? <CircularProgress size="small"
                  sx={{ width: "27px", height: "27px" }}
                /> : "Add Product"
              }

            </Button>

          </Grid>

        </Grid>

      </form>

    </div>
  )
}

export default AddProduct
