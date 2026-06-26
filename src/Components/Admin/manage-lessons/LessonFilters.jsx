"use client";

import {
  Input,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { FaSearch } from "react-icons/fa";

export default function LessonFilters({
  search,
  setSearch,
  category,
  setCategory,
  visibility,
  setVisibility,
  flagFilter,
  setFlagFilter,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

      {/* Search */}

      <Input
        placeholder="Search lesson..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startcontent={<FaSearch />}
      />

      {/* Category */}

      <Select
        className="w-full"
        selectedKey={category}
        onSelectionChange={(key) => setCategory(String(key))}
      >
        <Label>Category</Label>

        <Select.Trigger>
          <Select.Value placeholder="All Categories" />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>

            <ListBox.Item id="all" textValue="All">
              All
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="career" textValue="Career">
              Career
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="growth" textValue="Growth">
              Growth
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="relationship" textValue="Relationship">
              Relationship
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="health" textValue="Health">
              Health
              <ListBox.ItemIndicator />
            </ListBox.Item>

          </ListBox>
        </Select.Popover>
      </Select>

      {/* Visibility */}

      <Select
        className="w-full"
        selectedKey={visibility}
        onSelectionChange={(key) => setVisibility(String(key))}
      >
        <Label>Visibility</Label>

        <Select.Trigger>
          <Select.Value placeholder="All Visibility" />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>

            <ListBox.Item id="all" textValue="All">
              All
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="public" textValue="Public">
              Public
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="private" textValue="Private">
              Private
              <ListBox.ItemIndicator />
            </ListBox.Item>

          </ListBox>
        </Select.Popover>
      </Select>

      {/* Flags */}

      <Select
        className="w-full"
        selectedKey={flagFilter}
        onSelectionChange={(key) => setFlagFilter(String(key))}
      >
        <Label>Report Status</Label>

        <Select.Trigger>
          <Select.Value placeholder="All Reports" />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>

            <ListBox.Item id="all" textValue="All">
              All
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="flagged" textValue="Reported">
              Reported
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="clean" textValue="Clean">
              Clean
              <ListBox.ItemIndicator />
            </ListBox.Item>

          </ListBox>
        </Select.Popover>
      </Select>

    </div>
  );
}