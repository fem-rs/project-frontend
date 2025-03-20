"use client"

import React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingsProps {
    totalstars?: number
    size?: number
    fill?: boolean
    icon?: React.ReactElement
    asinput?: string
    value: number
    handlevaluechange?: (value: number) => void
}

const Ratings = ({ ...props }: RatingsProps) => {
    const {
        totalstars = 5,
        size = 20,
        fill = true,
        icon = <Star />,
        asinput = false,
        handlevaluechange,
        value,
    } = { ...props }

    const ratings = value

    const fullStars = Math.floor(ratings)
    const partialStar =
        ratings % 1 > 0 ? (
            <PartialStar
                fillPercentage={ratings % 1}
                size={size}
                icon={icon}
                asinput={asinput.toString().toLowerCase() == "true" ? true : false}
                handlevaluechange={() => handlevaluechange && handlevaluechange(fullStars + 1)}
            />
        ) : null
    return (

        <div className={cn("flex items-center gap-2")}>
            {
                [...Array(fullStars)].map((_, i) =>
                    React.cloneElement(icon, {
                        key: i,
                        size,
                        className: cn(
                            fill ? "fill-[#ff000d] stroke-red-600 " : "fill-transparent",
                            asinput ? "cursor-pointer" : ""
                        ),
                        role: props.asinput && "input",
                        onClick: () => handlevaluechange && handlevaluechange(i + 1),
                    })
                )
            }
            {partialStar}
            {
                [...Array(totalstars - fullStars - (partialStar ? 1 : 0))].map((_, i) =>
                    React.cloneElement(icon, {
                        key: i + fullStars + 1,
                        size,
                        className: cn(
                            asinput ? "cursor-pointer" : ""
                        ),
                        role: props.asinput && "input",
                        onClick: () =>
                            handlevaluechange &&
                            handlevaluechange(fullStars + i + 1 + (partialStar ? 1 : 0)),
                    })
                )
            }
        </div >
    )
}

interface PartialStarProps {
    fillPercentage: number
    size: number
    className?: string
    icon: React.ReactElement
    asinput?: boolean
    handlevaluechange?: () => void
}

const PartialStar = ({ ...props }: PartialStarProps) => {
    const { fillPercentage, size, className, icon, asinput, handlevaluechange }: any =
        props

    return (
        <div
            role={asinput ? "input" : undefined}
            onClick={() => handlevaluechange && handlevaluechange()}
            className={cn("relative inline-block", asinput && "cursor-pointer")}
        >
            {React.cloneElement(icon, {
                size,
                className: cn("fill-transparent", className),
            })}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    overflow: "hidden",
                    width: `${fillPercentage * 100}%`,
                }}
            >
                {React.cloneElement(icon, {
                    size,
                    className: cn("fill-current", className),
                })}
            </div>
        </div>
    )
}

export default Ratings