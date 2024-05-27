"use client"

import { ColumnDef } from "@tanstack/react-table"

import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests



export type Member = {
  "full_name": string
  "gender": string
  "institution": string
  unique_id?: string
}
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

export const columns: ColumnDef<Member>[] = [
  // ...
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Họ và tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
  {
    accessorKey: "institution",
    header: "Trường",
  },
  // ...
  
  {
    id: "update",

      cell: ({ row }) => {
        const member = row.original;
        const [fullName, setFullName] = React.useState(member.full_name);
        const [gender, setGender] = React.useState(member.gender);
        const [institution, setInstitution] = React.useState(member.institution);
    
        const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value);
        const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => setGender(event.target.value);
        const handleInstitutionChange = (event: React.ChangeEvent<HTMLInputElement>) => setInstitution(event.target.value);
    
        const handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
          console.log(event)

          const updatedMember = {
            ...member,
            full_name: fullName,
            gender: gender,
            institution: institution,
          };

          console.log(updatedMember)
    
          try {
            await axios.put(`http://localhost:6543/api/members/${member.unique_id}/`, updatedMember);
            // After successful update, close the dialog and re-render the row
          } catch (error) {
            console.error(error);
          }
        };
    
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sửa thông tin</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sửa thông tin</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="full_name" className="text-right">
                    Họ và tên
                  </Label>
                  <Input
                    id="full_name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gender" className="text-right">
                    Giới tính
                  </Label>
                  <Input
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="institution" className="text-right">
                    Trường
                  </Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={handleInstitutionChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <form onSubmit={handleSubmit}>
                  <Button type="submit">Lưu</Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      },

      },
      {
        id: "delete",
    
          cell: ({ row }) => {
            const member = row.original;

            const handleSubmit =  async (event: FormEvent<HTMLFormElement>) => {
              console.log(event)
            
              try {
                await axios.delete(`http://localhost:6543/api/members/${member.unique_id}/`);
                // After successful update, close the dialog and re-render the row
              } catch (error) {
                console.error(error);
              }

              location.reload();

            };
            return (
            <form onSubmit={handleSubmit}>
              <Button type="submit">Xoá</Button>
            </form>
            )
          },
      },
    
  
  // ...
]

type CreateMemberButtonProps = {};

export const CreateMemberButton: React.FC<CreateMemberButtonProps> = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [institution, setInstitution] = useState("");

  const member = {
    full_name: "",
    gender: "",
    institution: "",
  };


  const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value);
  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => setGender(event.target.value);
  const handleInstitution = (event: React.ChangeEvent<HTMLInputElement>) => setInstitution(event.target.value);

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event)

    const newMember = {
      ...member,
      full_name: fullName,
      gender: gender,
      institution: institution,
    };
    
    console.log(newMember)

    try {
      await axios.post(`http://localhost:6543/api/members/`, newMember);
      // After successful creation, close the dialog and re-render the table
    } catch (error) {
      console.error(error);
    }

    location.reload();

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Tạo mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo mới</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Họ và tên
            </Label>
            <Input
              id="full_name"
              // value={member.full_name}
              onChange={handleFullName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Giới tính
            </Label>
            <Input
              id="gender"
              // value={member.gender}
              onChange={handleGender}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="institution" className="text-right">
              Trường
            </Label>
            <Input
              id="institution"
              // value={member.institution}
              onChange={handleInstitution}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <form onSubmit={handleCreateSubmit}>
            <Button type="submit">Lưu</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
