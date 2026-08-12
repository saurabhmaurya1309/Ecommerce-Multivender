import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import React, { useState } from "react";

import { teal } from "@mui/material/colors";

import { colors } from "../../../data/Filter/colors";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";

import { useSearchParams } from "react-router-dom";


const FilterSection = () => {

  const [expandColor, setExpandColor] = useState(false);

  const [searchParams, setSearchParams] =
    useSearchParams();


  // ==========================================
  // UPDATE FILTER
  // ==========================================

  const updateFilterParams = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { value, name } = e.target;

    const newParams =
      new URLSearchParams(searchParams);

    if (value) {

      newParams.set(name, value);

    } else {

      newParams.delete(name);

    }

    setSearchParams(newParams);
  };


  // ==========================================
  // COLOR EXPAND
  // ==========================================

  const handleColorToggle = () => {

    setExpandColor((prev) => !prev);

  };


  return (

    <div className="space-y-5 bg-white">

      <div className="px-9 space-y-6">

        {/* ==================================
            COLOR
        ================================== */}

        <section>

          <FormControl>

            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              id="color"
            >
              Color
            </FormLabel>


            <RadioGroup
              aria-labelledby="color"
              name="color"

              // IMPORTANT:
              // value comes from URL
              value={searchParams.get("color") || ""}

              onChange={updateFilterParams}
            >

              {colors
                .slice(
                  0,
                  expandColor ? colors.length : 5
                )
                .map((item) => (

                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio />}

                    label={
                      <div className="flex items-center gap-3">

                        <p>{item.name}</p>

                        <p
                          style={{
                            backgroundColor: item.hex,
                          }}
                          className={`
                            h-5
                            w-5
                            rounded-full
                            ${
                              item.name === "White"
                                ? "border"
                                : ""
                            }
                          `}
                        />

                      </div>
                    }
                  />

                ))}

            </RadioGroup>

          </FormControl>


          <div>

            <button
              onClick={handleColorToggle}
              className="
                text-primary-color
                cursor-pointer
                hover:text-teal-900
                flex
                items-center
              "
            >

              {expandColor
                ? "hide"
                : `+${colors.length - 5} more`}

            </button>

          </div>

        </section>


        {/* ==================================
            PRICE
        ================================== */}

        <section>

          <FormControl>

            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              id="price"
            >
              Price
            </FormLabel>


            <RadioGroup
              aria-labelledby="price"
              name="price"

              // IMPORTANT
              value={searchParams.get("price") || ""}

              onChange={updateFilterParams}
            >

              {price.map((item) => (

                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={<Radio size="small" />}
                  label={item.name}
                />

              ))}

            </RadioGroup>

          </FormControl>

        </section>


        <Divider />


        {/* ==================================
            DISCOUNT
        ================================== */}

        <section>

          <FormControl>

            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              id="discount"
            >
              Discount
            </FormLabel>


            <RadioGroup
              aria-labelledby="discount"
              name="discount"

              // IMPORTANT
              value={
                searchParams.get("discount") || ""
              }

              onChange={updateFilterParams}
            >

              {discount.map((item) => (

                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={<Radio size="small" />}
                  label={item.name}
                />

              ))}

            </RadioGroup>

          </FormControl>

        </section>

      </div>

    </div>
  );
};


export default FilterSection;